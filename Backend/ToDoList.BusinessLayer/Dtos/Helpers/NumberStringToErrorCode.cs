using System;
using ToDoList.Common.Exceptions;

namespace ToDoList.BusinessLayer.Dtos.Helpers
{
    public static class NumberStringToErrorCode
    {
        /// <summary>
        /// Converts a number string to an <see cref="ErrorCode"/>
        /// </summary>
        /// <param name="numberString">The string to convert</param>
        /// <returns>The converted <see cref="ErrorCode"/></returns>
        public static ErrorCode convert(string numberString)
        {
            int errorCode = Convert.ToInt32(numberString);
            return (ErrorCode)errorCode;
        }
    }
}