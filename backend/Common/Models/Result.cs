public record Result<T>
{
    public T? Value { get; init; }
    public string? Error { get; init; }
    public bool IsSuccess => Error == null;

    public static implicit operator Result<T>(T value) => Success(value);

    public static implicit operator Result<T>(string error) => Failure(error);

    public static Result<T> Success(T value) => new() { Value = value };
    public static Result<T> Failure(string error) => new() { Error = error };

    public override string ToString() => IsSuccess
        ? $"Success: {Value}"
        : $"Failure: {Error}";
}