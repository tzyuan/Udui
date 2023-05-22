interface BankOrder {
    id: number,
    /**
     * 订单号
     */
    order_no: string,
     /**
     * 银行卡ID
     */
    bank_card_id: string,
     /**
     * 充值金额
     */
    amount: string,
    /**
    * 汇率
    */
    exchange_rate: number,
    /**
    * 是否仅允许私人账号转入
    */
    only_private: 0 | 1,
    /**
    * 是否可拆单
    */
    only_single: 0 | 1,
    /**
    * 是否需要电子回单
    */
    need_receipt: 0,
    /**
    * 备注
    */
    memo: string,
    /**
    * 状态(0待接单、1已接单、2已支付、3已完成、4已取消)
    */
    status: number,
     /**
     * 创建时间
     */
    create_time: string

}