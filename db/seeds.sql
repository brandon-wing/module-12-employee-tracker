INSERT INTO department (name)
VALUES  ("Laborers"),
        ("Information Technology"),
        ("Health and Wellness"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Swamp Expert", 50000, 1),
        ("Infantry", 30000, 1),
        ("Medic", 40000, 3),
        ("Back End Developer", 100000, 2),
        ("Defense Lawyer", 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Brandon", "Wing", 1, NULL),
        ("Bob", "Johnson", 2, NULL),
        ("Toby", "Keith", 3, 1),
        ("Peter", "Griffin", 4, 2),
        ("Courtney", "Love", 5, 2);
