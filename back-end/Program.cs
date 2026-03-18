using System.Reflection;
using System.Text.Json.Serialization;
using Asp.Versioning;
using back_end.DbContexts;
using back_end.Models;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var frontEndDevelopmentPolicy = "Angular Frontend Development";
var frontEndProductionPolicy = "Angular Frontend Production";

var builder = WebApplication.CreateBuilder(args);

// builder.Services.AddSingleton<ITodoRepository, MockTodoRepository>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(frontEndDevelopmentPolicy, policy =>
    {
        policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader().WithExposedHeaders("X-Pagination"); ;
    });
    options.AddPolicy(frontEndProductionPolicy, policy =>
    {
        policy.WithOrigins("https://red-forest-0dee89c1e.1.azurestaticapps.net").AllowAnyMethod().AllowAnyHeader().WithExposedHeaders("X-Pagination");
    });
});

builder
    .Services.AddControllers(options =>
    {
        options.ReturnHttpNotAcceptable = true;
    })
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());
    })
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.WriteIndented = true;
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
;

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(setupAction =>
{
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    setupAction.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));

    setupAction.AddSecurityDefinition("TodoApiBearerAuth", new()
    {
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        Description = "Input a valid token to access this API"
    });

    setupAction.AddSecurityRequirement(new()
    {
        {
            new ()
            {
                Reference = new OpenApiReference {
                    Type = ReferenceType.SecurityScheme,
                    Id = "TodoApiBearerAuth" }
            },
            new List<string>()
        }
    });

    // Exposes local
    if (builder.Environment.IsDevelopment())
    {
        setupAction.AddServer(new OpenApiServer
        {
            Url = builder.Configuration["Authentication:Issuer"],
            Description = "Local development"
        });
    }
});

builder.Services.AddDbContext<TodoContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("TodoDb"))
);

builder.Services.AddScoped<ITodoRepository, TodoRepository>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddAuthentication("Bearer").AddJwtBearer(options =>
{
    options.TokenValidationParameters = new()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Authentication:Issuer"],
        ValidAudience = builder.Configuration["Authentication:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Convert.FromBase64String(builder.Configuration["Authentication:SecretForKey"]))
    };
});

builder.Services.AddApiVersioning(setupAction =>
{
    setupAction.ReportApiVersions = true;
    setupAction.AssumeDefaultVersionWhenUnspecified = true;
    setupAction.DefaultApiVersion = new ApiVersion(1, 0);
}).AddMvc();

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseCors(frontEndDevelopmentPolicy);
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseCors(frontEndProductionPolicy);
}

app.UseForwardedHeaders();

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
