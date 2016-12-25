exports.seed=(knex)=>{

    return knex('ussenators')
.then(()=>{
    return knex('ussenators').insert([

        {        id: 1,
            name: 'Richard Shelby',
            state: 'Alabama',
            party: 'Republican',
            since: 1987
        },

        {
            id: 2,
            name: 'Jeff Sessions',
            state: 'Alabama',
            party: 'Republican',
            since: 1997
        }

    ]);
});
};
