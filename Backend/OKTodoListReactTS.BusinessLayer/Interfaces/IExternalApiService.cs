namespace OKTodoListReactTS.BusinessLayer.Interfaces
{
    public interface IExternalApiService<out T>
    {
        public T Client { get; }
    }
}