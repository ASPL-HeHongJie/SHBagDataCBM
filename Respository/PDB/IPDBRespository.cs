using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Models;

namespace Respository
{
    public interface IPDBRespository
    {
        public IEnumerable<Tag> GetTags(string IFIXNodeName);

        public IEnumerable<Tag> GetTagsByStation(string StationAbbrName);
        public Tag GetTag(string TagName);
    }
}
