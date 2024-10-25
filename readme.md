# Some Interesting problem

1. when two user tried to select the same seat.
2. payment is done by two concurrent user but only 1 seat is left.
3. payment kri but humko response hi ni aaya.
 - payment puchi hi nhi payament service thak
 - payment puchgyi service tak but un-successfully rhi but tumpe uska koi response ni aaya or vice-versa.

 ## Database Transcation
  - What is a db transcation?
    - IN real life situations, we might need to execute a series of queries in order to accomplish a task.
    - We might do a club of crud operations (like to read a record,update a record etc...)
    - These series of operations can a exceute in a single unit of work. Hence, these series of operation are called TRANSCATION.
    - Now , during the txns execution our database might go through a lot of changes and can be inconsistent intermediate state.[kuch data update hua kuch nhi]
    - to overcome the inconsistent intermediate state, it is a a duty of database capaibility.
    - ### They are 4 transcation capabilities. and these 4 are called ACID properites.
        - A -> Atomicity
        - C -> Consistency
        - I -> Isolation
        - D -> Durability
     -  #### Atomicity
         - A txn is a bundle of statements that intends to achieve one final state. When we are attempting a txn, we either want to complete all the statement or non of them. We never want a intermediate state. This called as Atomicity.
         - State of the txns
            -> Begin - when txn is just started.
            -> Commit - all the changes are applies successfully.
            -> Rollback - something happened in between and then whatever changes will successfully will be reverted.
     - #### Consistency
        - A data stored in a db is always vaild and in a consistent state.
     - #### Isolation
        - It is an ability of mulitple txns of execute without interferring with one another.
    - #### Durability
        - If something changed in a database and any unseen for circumstances happens then our changes should persist.
        - ex: db crashed - but you made some changes but you dont want loose these changes. [durabaility]
 
