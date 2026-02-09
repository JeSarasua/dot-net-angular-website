using System;
using AutoMapper;

namespace back_end;

public class TodoProfile : Profile
{
    public TodoProfile()
    {
        CreateMap<Entities.Todo, Models.TodoDto>();
        CreateMap<Models.TodoForCreationDto, Entities.Todo>();
        CreateMap<Models.TodoForUpdateDto, Entities.Todo>();
    }
}
