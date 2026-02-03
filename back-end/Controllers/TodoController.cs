using System.Net.Mime;
using back_end.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace back_end
{
    [Route("api/[controller]")]
    [Produces(MediaTypeNames.Application.Json)]
    [Consumes(MediaTypeNames.Application.Json)]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private ITodoRepository _TodoRepository;

        public TodoController(ITodoRepository TodoRepository)
        {
            _TodoRepository = TodoRepository;
        }

        // GET: api/<TodoController>
        /// <summary>
        /// Returns all Todos
        /// </summary>
        /// <returns>A collection of Todo items.</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IEnumerable<Todo> Get()
        {
            return _TodoRepository.AllTodos;
        }

        // GET: api/<TodoController>
        /// <summary>
        /// Returns a Todo by Id
        /// </summary>
        /// <returns>A single Todo item.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public Todo GetById(int id)
        {
            return _TodoRepository.GetTodoById(id);
        }
    }
}
