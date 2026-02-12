using AutoMapper;
using back_end.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace back_end
{
    [Route("api/todo")]
    [Produces("application/json")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private ITodoRepository _todoRepository;
        private readonly IMapper _mapper;

        public TodoController(ITodoRepository todoRepository, IMapper mapper)
        {
            _todoRepository = todoRepository;
            _mapper = mapper;
        }

        // GET: api/<TodoController>
        /// <summary>
        /// Returns all Todos
        /// </summary>
        /// <returns>A collection of Todo items.</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<TodoDto>>> GetTodos()
        {
            var todos = await _todoRepository.GetTodosAsync();
            return Ok(_mapper.Map<IEnumerable<TodoDto>>(todos));
        }

        // GET: api/<TodoController>
        /// <summary>
        /// Returns a Todo by Id
        /// </summary>
        /// <returns>A single Todo item.</returns>
        [HttpGet("{id}", Name = "GetTodo")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<TodoDto>> GetTodoById(int id)
        {
            var todo = await _todoRepository.GetTodoAsync(id);
            if (todo == null)
            {
                return NotFound();
            }
            var todoDto = _mapper.Map<TodoDto>(todo);
            return Ok(todoDto);
        }

        // POST: api/<TodoController>
        /// <summary>
        /// Create a new Todo
        /// </summary>
        /// <returns>A collection of Todo items.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<TodoDto>> CreateTodo(TodoForCreationDto createTodo)
        {
            // if(await _todoRepository.TodoExistsAsync())
            var todo = _mapper.Map<Entities.Todo>(createTodo);

            _todoRepository.CreateTodo(todo);
            await _todoRepository.SaveChangesAsync();

            var createdTodo = _mapper.Map<Models.TodoDto>(todo);

            return CreatedAtRoute("GetTodo", new
            {
                Id = createdTodo.Id,
            }, createdTodo);
        }

        // PUT: api/<TodoController>
        /// <summary>
        /// Update a single Todo
        /// </summary>
        /// <returns>A collection of Todo items.</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdateTodoById(int id, TodoForUpdateDto updatedTodo)
        {
            if (!await _todoRepository.TodoExistsAsync(id))
            {
                return NotFound();
            }

            var todo = await _todoRepository.GetTodoAsync(id);


            _mapper.Map(updatedTodo, todo);

            await _todoRepository.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/<TodoController>
        /// <summary>
        /// Partially update a single Todo
        /// </summary>
        /// <returns>A collection of Todo items.</returns>
        [HttpPatch("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> PartiallyUpdateTodoById(int id, JsonPatchDocument<TodoForUpdateDto> patchDocument)
        {
            if (!await _todoRepository.TodoExistsAsync(id))
            {
                return NotFound();
            }
            var todo = await _todoRepository.GetTodoAsync(id);

            var todoToPatch = _mapper.Map<TodoForUpdateDto>(todo);


            patchDocument.ApplyTo(todoToPatch, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!TryValidateModel(todoToPatch))
            {
                return BadRequest(ModelState);
            }

            _mapper.Map(todoToPatch, todo);

            await _todoRepository.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/<TodoController>
        /// <summary>
        /// Delete a single Todo
        /// </summary>
        /// <returns>A collection of Todo items.</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteTodo(int id)
        {
            var todo = await _todoRepository.GetTodoAsync(id);
            if (todo == null)
            {
                return NotFound();
            }

            _todoRepository.DeleteTodo(todo);
            await _todoRepository.SaveChangesAsync();
            return NoContent();
        }
    }
}
