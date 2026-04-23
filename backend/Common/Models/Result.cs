namespace JPSportsApi.Common;

public record Result<T>
{
    public T? Value { get; }
    public string? Error { get; }
    public bool IsSuccess { get; }

    private Result(T value) => (Value, IsSuccess) = (value, true);
    private Result(string error) => (Error, IsSuccess) = (error, false);

    public static Result<T> Success(T value) => new(value);
    public static Result<T> Failure(string error) => new(error);

    public static implicit operator Result<T>(T value) => Success(value);
    public static implicit operator Result<T>(string error) => Failure(error);

    public override string ToString() => IsSuccess
        ? $"Success: {Value}"
        : $"Failure: {Error}";
}
