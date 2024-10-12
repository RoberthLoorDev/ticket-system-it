export interface TicketInterface {
     name: string;
     id: number;
     subject: string;
     description: string;
     priority: string;
     department: string;
     creation_date: string;
     status: string;
     due_date: string;
     resolution_date: string;
     tech_name: string;
}

export interface TicketListInterface {
     tickets: TicketInterface[];
}
