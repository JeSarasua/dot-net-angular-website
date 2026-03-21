using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace back_end.Binders;

public class CommaDelimitedArrayModelBinder<T> : IModelBinder where T : struct, Enum
{
    public Task BindModelAsync(ModelBindingContext bindingContext)
    {
        var valueProviderResult = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);

        if (valueProviderResult == ValueProviderResult.None)
        {
            return Task.CompletedTask;
        }

        var values = valueProviderResult.FirstValue;

        if (string.IsNullOrEmpty(values))
        {
            return Task.CompletedTask;
        }

        var result = new List<T>();

        foreach (var value in values.Split(',', StringSplitOptions.RemoveEmptyEntries))
        {
            if (Enum.TryParse<T>(value.Trim(), ignoreCase: true, out var parsed))
            {
                result.Add(parsed);
            }
        }

        bindingContext.Result = ModelBindingResult.Success(result);
        return Task.CompletedTask;
    }
}
