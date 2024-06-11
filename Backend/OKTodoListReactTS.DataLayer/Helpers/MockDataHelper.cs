using System;
using System.Collections.Generic;

namespace OKTemplate.DataLayer.Helpers
{
    public static class MockDataHelper
    {
        private static readonly Random _random = new();

        public static IList<int> GenerateRandomNumbersBetween(int min, int max, int count)
        {
            if (max - min < count)
            {
                throw new InvalidOperationException("Cannot create that much random data!");
            }

            List<int> randomList = new();

            for (int i = 0; i < count; i++)
            {
                int next = _random.Next(min, max);
                if (!randomList.Contains(next))
                {
                    randomList.Add(next);
                }
            }

            return randomList;
        }
    }
}