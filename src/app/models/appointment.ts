export class Appointment {
	status: string;
	patientId: number;
	patientFirstName: string;
	patientLastName: string;
	disease: string;
	priority: string;
	tentativedate: string;
	registeredTime: any;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
