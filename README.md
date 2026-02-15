The purpose of this document is to explain the different rules used to automatically create an MTM transaction from an internal message that was received earlier, no matter which channel network was used.
All these rules are applied one by one to internal messages (based on the channel network used), with a few exceptions explained later. Internal messages will not go through automatic completion.
Each rule tries to collect required information from:
The internal message
Static data tables
Settings tables
Other related elements
This helps to fill and complete the MTM transaction.
If there is a problem in any rule (for example, if some required information cannot be found), a specific issue (anomaly) will be added to the transaction.
At the end of the process, if at least one serious issue is found, the transaction will be moved to a repair queue (with a special status showing it needs correction), along with the related problems.
Note: We also use the term automatic "enrichment" of internal messages, which means the same process
