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

            log.debug({ title : 'Testing Workflow Action Script', details : 'WFScript' });

            generateReport();

        }

        const generateReport = () =>
        {
            let renderer = render.create();

            log.debug({ title : 'Testing Renderer', details : renderer});
        }

        return {onAction};
    });
