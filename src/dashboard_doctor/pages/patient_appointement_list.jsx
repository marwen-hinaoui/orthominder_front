import AddAppointementModal from '../components/add_appointement_modal'
import { Space, Spin, Table, Tag, Empty, Breadcrumb } from 'antd'
import { useEffect, useState } from 'react'
import { set_loading_page } from '../../redux-toolkit/slices/user_slice'
import { useDispatch, useSelector } from 'react-redux'
import { TbListDetails } from 'react-icons/tb'
import { Link, useParams } from 'react-router'
import { get_appointements_by_patient_id } from '../doctor_api/get_appointements_by_patient_id'
import { MdDeleteForever, MdEditDocument } from 'react-icons/md'

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Treatment duration',
        dataIndex: 'treatment_duration',
        key: 'treatment_duration',
        render: text => <>{text} days</>,
    },
    {
        title: 'Appointemnt day',
        dataIndex: 'appointemnt_day',
        key: 'appointemnt_day',
    },
    {
        title: 'Next appointemnt day',
        dataIndex: 'next_appointemnt_day',
        key: 'next_appointemnt_day',
    },
    {
        title: 'Is paid',
        dataIndex: 'is_paid',
        key: 'is_paid',
        render: paid => {
            const color = paid ? 'green' : 'volcano'
            const text = paid ? 'Paid' : 'Not paid'
            return <Tag color={color}>{text}</Tag>
        },
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: status => {
            let color = 'default'
            if (status === 'IN PROGRESS') color = 'blue'
            else if (status === 'Completed') color = 'green'
            else if (status === 'Cancelled') color = 'volcano'
            return <Tag color={color}>{status}</Tag>
        },
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Link to={`${record.id}/details`}>
                    <TbListDetails size={18}  />
                </Link>
                <Link to={`${record.id}/details`}>
                    <MdEditDocument size={18}  />
                </Link>
                <Link >
                    <MdDeleteForever color='#cf1322' size={18} />
                </Link>
            </Space>
        ),
    },
]

const PatientAppointementList = () => {
    const dispatch = useDispatch()
    const isLoadingPage = useSelector(state => state.auth.isLoadingPage)
    const [appointementssData, setAppointementssData] = useState(null)
    const [noData, setNoData] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        const get_appointements = async () => {
            dispatch(set_loading_page(true))
            try {
                const res = await get_appointements_by_patient_id(id)
                if (res.resData && res.resData.data && res.resData.data.length > 0) {
                    setAppointementssData(res.resData.data)
                } else {
                    setNoData(true)
                }
            } catch (error) {
                setNoData(true)
            } finally {
                dispatch(set_loading_page(false))
            }
        }
        get_appointements()
    }, [id, appointementssData])

    if (appointementssData) {
        return (
            <div>
                <Breadcrumb
                          style={{ marginBottom: '18px' }}
                          items={[
                            {
                              title: <Link to={'/doctor/patients'} replace={true}> Patients </Link>,
                            },
                            {
                              title: `Patient appointements list`,
                            },
                          ]}
                        />
                <Table
                    columns={columns}
                    pagination={{ position: 'bottomRight' }}
                    dataSource={appointementssData}
                    rowKey="id"
                />
                <AddAppointementModal id={id} />
            </div>
        )
    }

    if (noData && !isLoadingPage) {
        return (
            <>
                <AddAppointementModal id={id} />
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </>
        )
        
    }

    return (
        <div style={{ width: "100%", textAlign: "center" }}>
            <Spin />
        </div>
    )
}

export default PatientAppointementList
