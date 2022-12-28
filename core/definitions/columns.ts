export const getUsersColumns = [
    {
        Header: "Menu",
        columns: [{
            accessor: "name",
            Header: "Name",
            // Header: () => (
            //     <p style={{text-align: 'center}}>번호</p>
            //   ),
            show: true,
            maxWidth: 300,
            minWidth: 300,
            width: 300,
        },
        {
            accessor: "menuType",
            Header: "menuType",
        },
        {
            accessor: "id",
            Header: "id",
        },
        {
            accessor: "code",
            Header: "code",
        },
        {
            accessor: "order",
            Header: "order",
        },
        {
            accessor: "creator",
            Header: "creator",
        },
        {
            accessor: "modifier",
            Header: "modifier",
        },]
    }
]