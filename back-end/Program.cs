using System.Reflection;
using back_end.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<ITodoRepository, MockTodoRepository>();

builder
    .Services.AddControllers(options =>
    {
        options.ReturnHttpNotAcceptable = true;
    })
    .AddXmlDataContractSerializerFormatters();

// builder.Services.AddProblemDetails(options =>
// {
//     options.CustomizeProblemDetails = ctx =>
//     {
//         ctx.ProblemDetails.Extensions.Add("additionalInfo", "Additional info example");
//     };
// });

builder.Services.AddEndpointsApiExplorer();

// builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(options =>
{
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    // app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
