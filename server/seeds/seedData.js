exports.seedData = [
  {
    title: 'Database',
    definitions: [
      {
        term: 'Abstract class',
        definition:
          'A class that has no direct instances but whose descendants may have direct instances.'
      },
      {
        term: 'Agile software development',
        definition:
          'An approach to database and software development that emphasizes “individuals and interactions over processes and tools, working software over comprehensive documentation, customer collaboration over contract negotiation, and response to change over following a plan.”'
      },
      {
        term: 'Anomalies',
        definition:
          'An error or inconsistency that may result when a user attempts to update a table that contains redundant data. The three types of anomalies are insertion, deletion, and modification anomalies.'
      },
      {
        term: 'Associative entity',
        definition:
          'An entity type that associates the instances of one or more entity types and contains attributes that are peculiar to the relationship between those entity instances.'
      },
      {
        term: 'Attribute',
        definition:
          'A property or characteristic of an entity or relationship type that is of interest to the organization.'
      },
      {
        term: 'Attribute inheritance',
        definition:
          'A property by which subtype entities inherit values of all attributes and instances of all relationships of their supertype.'
      },
      {
        term: 'Business rule',
        definition:
          'A statement that defines or constrains some aspect of the business. It is intended to assert business structure or to control or influence the behavior of the business.'
      },
      {
        term: 'Conceptual Schema',
        definition:
          'A detailed, technology independent specification of the overall structure of organizational data.'
      },
      {
        term: 'Constraint',
        definition: 'A rule that cannot be violated by database users.'
      },
      {
        term: 'Data',
        definition:
          "Stored representations of objects and events that have meaning and importance in the user's environment."
      },
      {
        term: 'Database',
        definition: 'An organized collection of logically related data.'
      },
      {
        term: 'Database application',
        definition:
          'An application program (or set of related programs) that is used to perform a series of database activities (create, read, update, and delete) on behalf of database users.'
      },
      {
        term: 'Database Management System (DBMS)',
        definition:
          'A software system that is used to create, maintain, and provide controlled access to user databases.'
      },
      {
        term: 'Data federation',
        definition:
          'A technique for data integration that provides a virtual view of integrated data without actually creating one centralized database.'
      },
      {
        term: 'Data Independence',
        definition:
          'The separation of data descriptions from the application programs that use the data.'
      },
      {
        term: 'Data type',
        definition:
          'A detailed coding scheme recognized by system software, such as a DBMS, for representing organizational data.'
      },
      {
        term: 'Denormalization',
        definition:
          'The process of transforming normalized relations into non-normalized physical record specifications.'
      },
      {
        term: 'Entity',
        definition:
          'A person, a place, an object, an event, or a concept in the user environment about which the organization wishes to maintain data.'
      },
      {
        term: 'Entity Instance',
        definition: 'A single occurrence of an entity type.'
      },
      {
        term: 'Entity-relationship diagram',
        definition:
          'A graphical representation of an entity-relationship model.'
      },
      {
        term: 'Entity-relationship model',
        definition:
          'A logical representation of the data for an organization or for a business area, using entities for categories of data and relationships for associations between entities.'
      },
      {
        term: 'Entity type',
        definition:
          'A collection of entities that share common properties or characteristics.'
      },
      {
        term: 'External schema',
        definition:
          'The view (or views) of managers and other employees who are the database users (end users).'
      },
      {
        term: 'Field',
        definition:
          'The smallest unit of application data recognized by system software.'
      },
      {
        term: 'Information',
        definition:
          'Data that have been processed in such a way as to increase the knowledge of the person who uses the data.  Information is closely related to data which is a stored representation of objects and events that have meaning and importance in the user’s environment.  To convert data into information you can for example add a few additional data items, provide structure, or summarize and present for human interpretation (graph).'
      },
      {
        term: 'Metadata',
        definition:
          'Data that describe the properties of characteristics of end-user data and the context of those data.'
      },
      {
        term: 'Physical Schema',
        definition:
          'Specifications for how data from a logical schema are stored in a computer’s secondary memory by a database management system.'
      },
      {
        term: 'Prototyping',
        definition:
          'An iterative process of systems development in which requirements are converted to a working system that is continually revised through close work between analysts and users.'
      },
      {
        term: 'Repository',
        definition:
          'A centralized knowledge base of all data definitions, data relationships, screen and report formats, and other system components.'
      },
      {
        term: 'SDLC',
        definition:
          'The SDLC (Systems development lifecycle) is a complete set of steps that a team of information systems professionals, including database designers and programmers, follow in an organization to specify, develop, maintain, and replace information systems.'
      },
      {
        term: 'User View',
        definition:
          'A user view is a logical description of some portion of the database that is required by a user to perform some task.'
      }
    ]
  },
  {
    title: 'Functional Programming',
    definitions: [
      {
        term: 'Higher-order function',
        definition:
          'a function that takes a function as an argument or returns a function or both.'
      },
      {
        term: 'Function Composition',
        definition:
          'applying one function to the results of another. E.g., function1(function2(variable)).'
      },
      {
        term: 'Currying',
        definition:
          'separating arguments with parenthesis instead of commas (note: currying uses higher-order functions so the function being called must return a function that accepts parameters). E.g., add(1)(5).'
      },
      {
        term: 'Pure Function',
        definition:
          'a function that given the same argument always returns the same result. So there can be no random values, no current date/time, no global state (DOM, files, db, etc), and no mutation of parameters.'
      },
      {
        term: 'Immutable',
        definition: 'Something that once created, cannot be changed.'
      },
      {
        term: 'Spread Operator',
        definition:
          'A way of copying all properties of an object (note: this does a shallow copy so be careful when using nested objects). E.g., {…oldObject}.'
      }
    ]
  }
];
