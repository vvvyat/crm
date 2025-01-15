import React, { useEffect, useState } from "react";
import { useInviteManagerMutation } from "../../fetch/invite-manager";
import { ConfigProvider, message } from 'antd';

export const InviteManager: React.FC = React.memo(() => {
    const [referalToken, setReferalToken] = useState<string>()
    const {mutateAsync: getToken, isError} = useInviteManagerMutation(setReferalToken)
    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        getToken()
    }, [])

    if (isError) {
        return <p className="fetch-warnings">При загрузке произошла ошибка</p>
    } else {
        const link = `http://localhost:5173/register-with-token/${referalToken}`
        return (
            <>
                <ConfigProvider
                    theme={{
                        token: {
                            fontFamily: 'Philosopher',
                            fontSize: 16,
                        },
                        components: {
                            Message: {
                                contentBg: '#dedab4',
                            },
                        },
                    }}
                >
                    {contextHolder}
                </ConfigProvider>
                <div className="invite-manager-container">
                    <h2>Пригласить руководителя</h2>
                    <p>Отправьте руководителю эту ссылку, для регистрации в системе</p>
                    <div className="referal-reg-link">
                        {link.length > 100 ? `${link.slice(0, 100)}...` : link}
                        <img src="../../img/copy.svg" onClick={() => {
                            navigator.clipboard.writeText(link)
                                .then(() => {
                                    messageApi.open({
                                        content: 'Скопировано',
                                    });
                                })
                            }
                            }></img>
                        </div>
                </div>
            </>
        )
    }
})
