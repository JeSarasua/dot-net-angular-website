using Microsoft.AspNetCore.Mvc;

public abstract class BaseController : ControllerBase
{
    protected ActionResult NotFoundProblem(string resource, int id) =>
        Problem(
            detail: $"{resource} with ID '{id}' was not found.",
            statusCode: StatusCodes.Status404NotFound,
            title: "Resource Not Found"
        );
}