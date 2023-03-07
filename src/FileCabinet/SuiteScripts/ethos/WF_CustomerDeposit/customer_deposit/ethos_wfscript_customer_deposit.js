/**
 * @NApiVersion 2.1
 * @NScriptType WorkflowActionScript
 */
define(['N/file', 'N/query', 'N/record', 'N/render'],
    (file, query, record, render) => {
        /**
         * Defines the WorkflowAction script trigger point.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.workflowId - Internal ID of workflow which triggered this action
         * @param {string} scriptContext.type - Event type
         * @param {Form} scriptContext.form - Current form that the script uses to interact with the record
         * @since 2016.1
         */
        const onAction = (scriptContext) => {

            const customerDeposit = scriptContext.newRecord;

            log.debug({ title : 'Testing Workflow Action Script', details : 'WFScript' });

            // Getting Payment Events List Info from Netsuite //
            let paymentEventsListName = 'paymentevent';
            let lineCount = customerDeposit.getLineCount({sublistId : paymentEventsListName});

            // Getting Customer Deposit Primary Info //
            let customer = customerDeposit.getValue({fieldId : 'entityname'});
            let salesOrder = customerDeposit.getValue({fieldId : 'salesorder'});
            let currency = customerDeposit.getValue({fieldId : 'currencyname'});
            let postingPeriod = customerDeposit.getValue({fieldId : 'postingperiod'});
            let account = customerDeposit.getValue({fieldId : 'account'});
            let deposit = customerDeposit.getValue({fieldId : 'tranid'});
            let paymentAmount = customerDeposit.getValue({fieldId : 'payment'});

            let depositData = {
                customer,
                salesOrder,
                currency,
                postingPeriod,
                account,
                deposit,
                paymentAmount,
                paymentEvents : [],
            };

            // Getting Payment Events Info //
            for (let i = 0; i < lineCount; i++)
            {
                let eventRecord =
                    {
                        transaction : customerDeposit.getSublistValue({
                            sublistId : paymentEventsListName,
                            fieldId : 'owningtransaction',
                            line : i}),
                        tranEvent : customerDeposit.getSublistValue({
                            sublistId : paymentEventsListName,
                            fieldId : 'type',
                            line : i}),
                        payment : customerDeposit.getSublistValue({
                            sublistId : paymentEventsListName,
                            fieldId : 'card',
                            line : i}),
                        result : customerDeposit.getSublistValue({
                            sublistId : paymentEventsListName,
                            fieldId : 'result',
                            line : i}),
                        amount : customerDeposit.getSublistValue({
                            sublistId : paymentEventsListName,
                            fieldId : 'amount',
                            line : i}),
                        date : customerDeposit.getSublistValue({
                            sublistId : paymentEventsListName,
                            fieldId : 'eventdate',
                            line : i}),
                    };

                depositData.paymentEvents.push(eventRecord);
                log.debug({ title : 'Iterating over Event: ' + 1 , details : depositData });
            }


            // generateReport();

        }

        /* const generateReport = () =>
        {
            let renderer = render.create();

            log.debug({ title : 'Testing Renderer', details : renderer});
        } */

        return {onAction};
    });
