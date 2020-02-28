import moment from 'moment';

export default {
    formatJob,
    formatGoogleCalendarEvent,
    formatBigCalendarEvent,
    formatJobImage,
};

function formatJob(values) {
    let { customer, slotEvent, details, team } = values;
    let { address } = customer.locations[0];
    return {
        customer: customer.docId || 'Unknown',
        details: {
            arrivalWindowStart:
                moment(details.arrivalWindowStart).format('LLL') || null,
            arrivalWindowEnd:
                moment(details.arrivalWindowEnd).format('LLL') || null,
            duration: details.duration || 1,
            latest_end_time: moment(details.arrivalWindowEnd)
                .add(details.duration, 'hours')
                .format('LLL'),
        },
        location: {
            street: address.street || '',
            city: address.city || '',
            state: address.state || '',
            zipcode: address.zipcode || '',
        },
        type: details.cleaningType || '',
        team: team,
    };
}

function formatGoogleCalendarEvent(values) {
    let { newJobDocId, customer, slotEvent, details, team } = values;
    let { address } = customer.locations[0];

    return {
        calendarId: values.calendarId || 'primary',
        start: {
            dateTime: moment(details.arrivalWindowStart).toISOString(),
            timeZone: 'America/Chicago',
        },
        end: {
            dateTime: moment(details.arrivalWindowEnd)
                .add(details.duration, 'hours')
                .toISOString(),
            timeZone: 'America/Chicago',
        },
        summary: customer.name,
        description: `Customer Name: ${customer.name}, CustomerId: ${customer.docId}, Team Name: ${team.name}, Team Id: ${team.docId}, zipcode: ${address.zipcode}, type: ${details.cleaningType}`,
        extendedProperties: {
            shared: {
                customerName: customer.name,
                customerId: customer.docId,
                jobId: newJobDocId,
                zipcode: address.zipcode,
                teamName: team.name || 'Unknown Team',
                teamId: team.docId || 'Unknown Team Id',
                type: details.cleaningType,
                team: JSON.stringify(team),
            },
        },
    };
}

//TODO: Will need to adjust the end date to ensure that it's to the latest end time
function formatBigCalendarEvent(calEvent) {
    //formatting from a new calendar event being added!
    if (calEvent.newJobDocId) {
        let { newJobDocId, customer, slotEvent, details, team } = calEvent;
        let { address } = customer.locations[0];

        return {
            id: newJobDocId || customer.docId,
            title: customer.name || 'Unknown Name',
            start: new Date(details.arrivalWindowStart || ''),
            end: new Date(
                moment(details.arrivalWindowEnd).add(
                    details.duration,
                    'hours'
                ) || ''
            ),
            details: {
                customerName: customer.name || 'Unknown Name',
                customerId: customer.docId || 'Unknown Doc Id',
                jobId: newJobDocId || 'Unknown job id',
                zipcode: address.zipcode || 'Unknown Zipcode',
                teamName: team.name || 'Unknown Team',
                teamId: team.docId || 'Unknown Team Id',
                type: details.cleaningType || 'Unknown Cleaning Type',
                team: team,
            },
        };
    } else {
        //formatting from google calendar events that are pulled from the calendar
        if (calEvent.extendedProperties) {
            let {
                extendedProperties: { shared },
            } = calEvent;
            return {
                id: shared.customerId || 'Unknown Id',
                title: shared.customerName || 'Unknown Name',
                start: new Date(calEvent.start.dateTime || calEvent.start.date),
                end: new Date(calEvent.end.date || calEvent.end.dateTime),
                details: {
                    customerName: shared.customerName || 'Unknown Name',
                    customerId: shared.customerId || 'Unknown customer Doc Id',
                    jobId: shared.jobId || 'Unknown job',
                    zipcode: shared.zipcode || 'Unknown Zipcode',
                    teamName: shared.teamName || 'Unknown Team Name',
                    teamId: shared.teamId || 'Unknown Team Id',
                    type: shared.type || 'Unknown Cleaning Type',
                    team: !!shared.team ? JSON.parse(shared.team) : null,
                },
            };
        } else {
            //This is for events that weren't created within the software
            return {
                id: calEvent.id,
                title: calEvent.summary || 'Unknown Name',
                start: new Date(calEvent.start.dateTime || calEvent.start.date),
                end: new Date(calEvent.end.date || calEvent.end.dateTime),
                team: null,
            };
        }
    }
}

function formatJobImage(values) {
    return {
        jobId: values.jobId || null,
        photos: values.photos || [],
        url: values.uploadedImg || values.url || null,
        tag: values.tag || null,
        note: values.note || null,
    };
}
