using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using Microsoft.Extensions.Configuration;
using OPCAutomation;
using Models;
using System.IO;
using System.Linq;
using System.Timers;

namespace Services
{
    public class OPCClientService : IOPCClientService
    {
        private readonly IConfiguration _configuration;
        private List<OpcItem> _OPCItems = new List<OpcItem>();
        private OPCServer _server;
        private OPCGroup _group;
        private string _status;
        private Array _itemServerHandles;
        private Timer _tmrWotchDog;
        private Timer _tmrReadAll;
        public OPCClientService(IConfiguration configuration)
        {
            _server = new OPCServer();
            _configuration = configuration;
            WriteLog("OPC New");
        }
        ~OPCClientService()
        {
            if (bool.Parse(_configuration["IsSubscribed"]) == true)
            {
                try
                {
                    _group.DataChange -= new DIOPCGroupEvent_DataChangeEventHandler(ConnectedGroup_DataChange);
                }
                catch (Exception ex)
                {
                }
            }
            else
            {
                try
                {
                    _tmrReadAll.Enabled = false;
                }
                catch (Exception ex)
                {
                }
            }

            try
            {
                RemoveItems();
            }
            catch (Exception ex)
            {
            }
            try
            {
                _server.OPCGroups.Remove("Group");
            }
            catch (Exception ex)
            {
            }
            try
            {
                _server.Disconnect();
            }
            catch (Exception ex)
            {
            }
            _server = null;
        }

        public void SetOPCItems(List<Tag> tags)
        {
            foreach (Tag tag in tags)
            {
                OpcItem item = new OpcItem();
                item.Name = tag.Name;
                item.Address = tag.Address;
                item.Quality = "Uncertain";
                item.Value = "????";
                _OPCItems.Add(item);
            }
        }
        public List<OpcItem> GetAllOPCItems()
        {
            return _OPCItems;
        }
        private OPCServerState Connect()
        {
            try
            {
                _server.Connect(_configuration["OPCServerName"]);
                if ((OPCServerState)_server.ServerState == OPCServerState.OPCRunning)
                {
                    WriteLog("OPC Connect OK!");
                }
                else
                {
                    WriteLog("OPC Connect false!");
                }
                return (OPCServerState)_server.ServerState;
            }
            catch (Exception ex)
            {
                return OPCServerState.OPCFailed;
            }
        }
        private void Disconnect()
        {
            try
            {
                _server.Disconnect();
            }
            catch (Exception ex)
            {

            }
        }
        private void AddGroup()
        {
            _server.OPCGroups.DefaultGroupIsActive = true;
            _server.OPCGroups.DefaultGroupDeadband = 0.0f;
            _group = _server.OPCGroups.Add("Group");
            _group.UpdateRate = 1000;
            _group.IsSubscribed = bool.Parse(_configuration["IsSubscribed"]);
            WriteLog("OPC add group OK!");
        }
        private void RemoveGroup()
        {
            try
            {
                _server.OPCGroups.Remove("Group");
            }
            catch (Exception ex)
            {
            }
        }
        private void AddItems()
        {
            int i = 1;
            Array OPCItemNames = Array.CreateInstance(typeof(string), _OPCItems.Count + 1);
            Array ClientHandles = Array.CreateInstance(typeof(int), _OPCItems.Count + 1);
            Array AddItemServerHandles;
            Array AddItemServerErrors;
            if (_group != null)
            {

                for (i = 1; i <= _OPCItems.Count; i++)
                {
                    OPCItemNames.SetValue(_OPCItems[i - 1].Address, i);
                    ClientHandles.SetValue(i, i);
                }

                _group.OPCItems.DefaultIsActive = true;
                _group.OPCItems.AddItems(_OPCItems.Count, ref OPCItemNames, ref ClientHandles, out AddItemServerHandles, out AddItemServerErrors, Type.Missing, Type.Missing);

                for (i = 1; i <= AddItemServerErrors.GetLength(0); i++)
                {
                    if ((int)AddItemServerErrors.GetValue(i) != 0)
                    {
                        AddItemServerHandles.SetValue(0, i);
                        WriteLog("Tag loss:" + _OPCItems[i - 1].Address);
                    }
                    else
                    {
                        //WriteLog("Tag Add OK:" + _OPCItems[i - 1].Address);
                    }
                }
                _itemServerHandles = AddItemServerHandles;
            }
            //_Group.DataChange += new DIOPCGroupEvent_DataChangeEventHandler(DataChange);
        }

        private void RemoveItems()
        {
            int i;
            if (_itemServerHandles != null)
            {
                if (_itemServerHandles.GetLength(0) >= 1)
                {
                    Array removeItemServerHandles; // Array.CreateInstance(typeof(int), ItemServerHandles.GetLength(0) + 1);
                    Array removeItemServerError;
                    List<int> handle = new List<int>();
                    for (i = 1; i <= _itemServerHandles.GetLength(0); i++)
                    {
                        if ((int)_itemServerHandles.GetValue(i) != 0)
                        {
                            handle.Add((int)_itemServerHandles.GetValue(i));
                        }
                    }
                    removeItemServerHandles = handle.ToArray<int>();
                    _group.OPCItems.Remove(_itemServerHandles.GetLength(0), ref removeItemServerHandles, out removeItemServerError);
                }
            }
        }

        private void ReadAll()
        {
            Array SyncItemValues;
            Array SyncItemServerErrors;
            Array tItemServerHandles = _itemServerHandles;
            object SycQuality;
            object SycTimeStamps;
            if (_status == "Not Running")
            {
                return;
            }
            try
            {
                _group.SyncRead((short)OPCAutomation.OPCDataSource.OPCDevice, (int)_itemServerHandles.GetLength(0), ref tItemServerHandles, out SyncItemValues, out SyncItemServerErrors, out SycQuality, out SycTimeStamps);

            }
            catch (Exception ex)
            {
                return;
            }
            Array quality = (Array)SycQuality;
            for (int i = 1; i <= (int)_itemServerHandles.GetLength(0); i++)
            {
                if ((int)SyncItemServerErrors.GetValue(i) == 0)
                {
                    switch (quality.GetValue(i))
                    {
                        case (short)192:
                            {
                                _OPCItems[i - 1].Value = SyncItemValues.GetValue(i).ToString();
                                _OPCItems[i - 1].Quality = "Good";
                                break;
                            }
                        case (short)64:
                            {
                                _OPCItems[i - 1].Value = "???";
                                _OPCItems[i - 1].Quality = "Uncertain";
                                break;
                            }
                        default:
                            {
                                if (SyncItemValues.GetValue(i) == null)
                                {
                                    _OPCItems[i - 1].Value = "???";
                                }
                                else
                                {
                                    _OPCItems[i - 1].Value = "???";
                                }
                                _OPCItems[i - 1].Quality = "Bad";
                                break;
                            }

                    }
                }
                else
                {
                    _OPCItems[i - 1].Value = "???";
                    _OPCItems[i - 1].Quality = "Bad";
                }
                // Globe.writeLog(OPCItems[i - 1].Name + " is update! Value:" + OPCItems[i - 1].Value + ";Quality:" + OPCItems[i - 1].Quality);
            }
        }

        public void Reconnect()
        {
            _status = "Not Running";
            if (bool.Parse(_configuration["IsSubscribed"]) == true)
            {
                try
                {
                    _group.DataChange -= new DIOPCGroupEvent_DataChangeEventHandler(ConnectedGroup_DataChange);
                }
                catch (Exception ex)
                {
                }
            }
            else
            {
                try
                {
                    _tmrReadAll.Enabled = false;
                }
                catch (Exception ex)
                {
                }
            }

            try
            {
                RemoveItems();
            }
            catch (Exception ex)
            {
            }
            try
            {
                _server.OPCGroups.Remove("Group");
            }
            catch (Exception ex)
            {
            }
            try
            {
                _server.Disconnect();
            }
            catch (Exception ex)
            {
            }
            if (Connect() == OPCServerState.OPCRunning)
            {
                AddGroup();
                AddItems();
                _status = "Running";
                if (bool.Parse(_configuration["IsSubscribed"]) == true)
                {
                    ReadAll();
                    _group.DataChange += new DIOPCGroupEvent_DataChangeEventHandler(ConnectedGroup_DataChange);
                }
                else
                {
                    _tmrReadAll.Enabled = true;
                    ReadAll_Elapsed(null, null);
                }
            }
            else
            {
                _status = "Not Running";
            }
            WriteLog("Reconnect done！");
        }


        private void WatchDog()
        {
            int i;
            try
            {
                Array SyncItemServerHandles = Array.CreateInstance(typeof(int), 2);
                Array SyncItemValues;
                Array SyncItemServerErrors;
                object SycQuality;
                object SycTimeStamps;
                if (_itemServerHandles == null)
                {
                    _status = "Not Running";
                    return;
                }
                if (_itemServerHandles.Length == 0)
                {
                    _status = "Not Running";
                    return;
                }
                if ((int)_itemServerHandles.GetValue(1) != 0)
                {
                    SyncItemServerHandles.SetValue((int)_itemServerHandles.GetValue(1), 1);
                    _group.SyncRead((short)OPCAutomation.OPCDataSource.OPCDevice, 1, ref SyncItemServerHandles, out SyncItemValues, out SyncItemServerErrors, out SycQuality, out SycTimeStamps);
                    if ((int)SyncItemServerErrors.GetValue(1) != 0)
                    {
                        //Globe.writeLog("OPC Read Error:" + SyncItemServerErrors.GetValue(1));
                        _status = "Not Running";
                    }
                }
                else
                {
                    _status = "Not Running";
                }
            }
            catch (Exception ex)
            {
                _status = "Not Running";
            }

        }

        private void ReadAll_Elapsed(object sender, System.Timers.ElapsedEventArgs e)
        {
            ReadAll();
        }
        private void WatchDog_Elapsed(object sender, System.Timers.ElapsedEventArgs e)
        {
            //Globe.writeLog("DOG Wathing!");
            if (_status != "Running")
                WriteLog("Watch Begin: status= " + _status);
            WatchDog();
            if (_status != "Running")
            {
                foreach (OpcItem item in _OPCItems)
                {
                    item.Value = "???";
                    item.Quality = "Bad";
                }
                Reconnect();
            }
            if (_status != "Running")
                WriteLog("Watch End: status= " + _status);
        }

        private void ConnectedGroup_DataChange(int TransactionID, int NumItems, ref Array ClientHandles, ref Array ItemValues, ref System.Array Qualities, ref System.Array TimeStamps)
        {
            try
            {
                int i;
                for (i = 1; i <= NumItems; i++)
                {
                    switch ((OPCQuality)Qualities.GetValue(i))
                    {
                        case OPCQuality.OPCQualityGood:
                            _OPCItems[(int)ClientHandles.GetValue(i) - 1].Value = ItemValues.GetValue(i).ToString();
                            _OPCItems[(int)ClientHandles.GetValue(i) - 1].Quality = "Good";
                            break;
                        case OPCQuality.OPCQualityUncertain:
                            _OPCItems[(int)ClientHandles.GetValue(i) - 1].Value = "???";
                            _OPCItems[(int)ClientHandles.GetValue(i) - 1].Quality = "Uncertain";
                            break;
                        default:
                            _OPCItems[(int)ClientHandles.GetValue(i) - 1].Value = "???";
                            _OPCItems[(int)ClientHandles.GetValue(i) - 1].Quality = "Bad";
                            break;
                    }
                    //  WriteLog(_OPCItems[(int)ClientHandles.GetValue(i) - 1].Address + " is update! Value:" + _OPCItems[(int)ClientHandles.GetValue(i) - 1].Value + ";Quality:" + _OPCItems[(int)ClientHandles.GetValue(i) - 1].Value);
                }
                //  WriteLog(NumItems.ToString());
                //WriteLog(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss:") + "Update Data.");
            }
            catch (Exception ex)
            {
            }
        }

        public void Run()
        {
            if (Connect() == OPCServerState.OPCRunning)
            {
                AddGroup();
                AddItems();
                _status = "Running";
                if (bool.Parse(_configuration["IsSubscribed"]) == true)
                {
                    ReadAll();
                    _group.DataChange += new DIOPCGroupEvent_DataChangeEventHandler(ConnectedGroup_DataChange);
                }
                else
                {
                    _tmrReadAll = new System.Timers.Timer(30000);
                    //Globe.writeLog("Watch Dog Start");
                    _tmrReadAll.Elapsed += new ElapsedEventHandler(ReadAll_Elapsed);
                    _tmrReadAll.Enabled = true;
                    _tmrReadAll.AutoReset = true;
                    ReadAll_Elapsed(null, null);
                }
            }
            else
            {
                _status = "Not Running";
            }

            _tmrWotchDog = new System.Timers.Timer(30000);
            _tmrWotchDog.Elapsed += new ElapsedEventHandler(WatchDog_Elapsed);
            _tmrWotchDog.Enabled = true;
            _tmrWotchDog.AutoReset = true;
        }

        private void WriteLog(string error)
        {
            if (!File.Exists(System.AppDomain.CurrentDomain.BaseDirectory + "OPCClientLog.txt"))
            {
                File.Create(System.AppDomain.CurrentDomain.BaseDirectory + "OPCClientLog.txt").Dispose();

            }
            try
            {
                StreamWriter sw = new StreamWriter(System.AppDomain.CurrentDomain.BaseDirectory + "Log.txt", true);
                sw.WriteLine(DateTime.Now.ToString() + "   " + error);
                sw.Flush();
                sw.Close();
            }
            catch (Exception ex)
            {
            }
        }

    }
}
