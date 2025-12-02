const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

    const { Attendance } = this.entities;

    this.on('calculateAttendance', async (req) => {

        const studentID = req.data.studentID;

        if (!studentID) {
            return req.error(400, 'studentID is required');
        }

        const totalRecords = await SELECT.from(Attendance)
            .where({ student: { ID: studentID } });

        const presentRecords = await SELECT.from(Attendance)
            .where({ student: { ID: studentID }, present: true });

        const totalCount = totalRecords.length;
        const presentCount = presentRecords.length;

        if (totalCount === 0) {
            return {
                percentage: 0.00,
                eligible: false
            };
        }

        const percentage = Number(((presentCount / totalCount) * 100).toFixed(2));
        const eligible = percentage >= 75;

        return { percentage, eligible };
    });
});