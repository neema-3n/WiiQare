const VouchersColumns: any[] = [
    {
        field: 'voucherId',
        headerName: 'Voucher ID',
        minWidth: 90,
        flex: 1,
    },
    {
        field: 'amountInLocalCurrency',
        headerName: 'Amount In Local Currency',
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'amountInSenderCurrency',
        headerName: 'Amount In Sender Currency',
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'payerId',
        headerName: 'Payer ID',
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'beneficiaryId',
        headerName: 'Beneficiary ID',
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'voucherOwnerId',
        headerName: 'Voucher Owner ID',
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'voucherStatus',
        headerName: 'Voucher Status',
        minWidth: 150,
        flex: 1,
    },
];

export default VouchersColumns;
