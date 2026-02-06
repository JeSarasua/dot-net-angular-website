using System.Net.Mime;
using back_end.Models;
using Microsoft.AspNetCore.Mvc;

namespace back_end
{
    [Route("api/todo")]
    [Produces("application/json")]
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
        public ActionResult<IList<TodoDto>> GetTodos()
        {
            return Ok(_TodoRepository.AllTodos);
        }

        // GET: api/<TodoController>
        /// <summary>
        /// Returns a Todo by Id
        /// </summary>
        /// <returns>A single Todo item.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<TodoDto> GetById(int id)
        {
            Todo todo = _TodoRepository.GetTodoById(id);
            if (todo == null)
            {
                return NotFound();
            }
            return Ok(todo);
        }

        // POST: api/<TodoController>
        /// <summary>
        /// Create a new Todo
        /// </summary>
        /// <returns>A collection of Todo items.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<TodoDto> CreateTodo(TodoForCreationDto createTodo)
        {
            _TodoRepository.CreateTodo(createTodo);
            return Created();
        }

        // PUT: api/<TodoController>
        /// <summary>
        /// Update a single Todo
        /// </summary>
        /// <returns>A collection of Todo items.</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<TodoDto> UpdateById(int id, TodoForUpdateDto updatedTodo)
        {
            if (_TodoRepository.GetTodoById(id) == null) return NotFound();

            _TodoRepository.UpdateTodoById(id, updatedTodo);
            return NoContent();
        }

        // POST: api/<TodoController>
        /// <summary>
        /// Create a new Todo
        /// </summary>
        /// <returns>A collection of Todo items.</returns>
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<TodoDto> DeleteTodo(int id)
        {
            if (_TodoRepository.GetTodoById(id) == null) return NotFound();

            _TodoRepository.DeleteTodoById(id);
            return NoContent();
        }
    }
}
