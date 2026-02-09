using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace back_end.Migrations
{
    /// <inheritdoc />
    public partial class InitialDataSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Todos",
                columns: new[] { "Id", "CreatedDate", "Description", "DueDate", "Name", "Status" },
                values: new object[,]
                {
                    {
                        1,
                        new DateTimeOffset(
                            new DateTime(2026, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            new TimeSpan(0, 0, 0, 0, 0)
                        ),
                        "Wipe the counters, do the dishes, and sweep the floor",
                        new DateTimeOffset(
                            new DateTime(2026, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            new TimeSpan(0, 0, 0, 0, 0)
                        ),
                        "Clean the kitchen",
                        0,
                    },
                    {
                        2,
                        new DateTimeOffset(
                            new DateTime(2026, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            new TimeSpan(0, 0, 0, 0, 0)
                        ),
                        "Review the authentication logic in the new login module",
                        new DateTimeOffset(
                            new DateTime(2026, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            new TimeSpan(0, 0, 0, 0, 0)
                        ),
                        "Review Pull Request",
                        1,
                    },
                    {
                        3,
                        new DateTimeOffset(
                            new DateTime(2026, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            new TimeSpan(0, 0, 0, 0, 0)
                        ),
                        "Call Dr. Smith for a routine checkup and cleaning",
                        new DateTimeOffset(
                            new DateTime(2026, 2, 22, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            new TimeSpan(0, 0, 0, 0, 0)
                        ),
                        "Book Dentist Appointment",
                        0,
                    },
                    {
                        4,
                        new DateTimeOffset(
                            new DateTime(2026, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            new TimeSpan(0, 0, 0, 0, 0)
                        ),
                        "Compile all expenses and progress updates for January",
                        new DateTimeOffset(
                            new DateTime(2026, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            new TimeSpan(0, 0, 0, 0, 0)
                        ),
                        "Submit Monthly Report",
                        1,
                    },
                    {
                        5,
                        new DateTimeOffset(
                            new DateTime(2026, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            new TimeSpan(0, 0, 0, 0, 0)
                        ),
                        "Leg day and 20 minutes of cardio",
                        new DateTimeOffset(
                            new DateTime(2026, 2, 8, 16, 0, 0, 0, DateTimeKind.Unspecified),
                            new TimeSpan(0, 0, 0, 0, 0)
                        ),
                        "Gym Session",
                        0,
                    },
                    {
                        6,
                        new DateTimeOffset(
                            new DateTime(2026, 2, 7, 23, 0, 0, 0, DateTimeKind.Unspecified),
                            new TimeSpan(0, 0, 0, 0, 0)
                        ),
                        "Straighten the sheets, fluff the pillows, and pull up the duvet",
                        new DateTimeOffset(
                            new DateTime(2026, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            new TimeSpan(0, 0, 0, 0, 0)
                        ),
                        "Make my bed",
                        2,
                    },
                }
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(table: "Todos", keyColumn: "Id", keyValue: 1);

            migrationBuilder.DeleteData(table: "Todos", keyColumn: "Id", keyValue: 2);

            migrationBuilder.DeleteData(table: "Todos", keyColumn: "Id", keyValue: 3);

            migrationBuilder.DeleteData(table: "Todos", keyColumn: "Id", keyValue: 4);

            migrationBuilder.DeleteData(table: "Todos", keyColumn: "Id", keyValue: 5);

            migrationBuilder.DeleteData(table: "Todos", keyColumn: "Id", keyValue: 6);
        }
    }
}
