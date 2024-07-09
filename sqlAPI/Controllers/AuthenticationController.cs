using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class AuthenticationController : ControllerBase
{
    [HttpGet]
    [Authorize(AuthenticationSchemes = "Kerberos")]
    public IActionResult Get()
    {
        return Ok("Authenticated");
    }
}