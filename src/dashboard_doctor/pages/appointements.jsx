import { Spin, Table, Tag, Empty } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { get_all_appointements } from '../doctor_api/get_all_appointements'
import { set_loading_page } from '../../redux-toolkit/slices/user_slice'

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
    title: 'Is paid',
    dataIndex: 'is_paid',
    key: 'is_paid',
    render: paid => {
      let color = paid ? 'green' : 'volcano'
      let text = paid ? 'Paid' : 'Not paid'
      return (
        <Tag color={color}>
          {text}
        </Tag>
      )
    }
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: status => {
      let color = ''
      if (status === 'IN PROGRESS') color = 'blue'
      else if (status === 'Completed') color = 'green'
      else if (status === 'Cancelled') color = 'volcano'
      return (
        <Tag color={color}>
          {status}
        </Tag>
      )
    }
  },
]

const Appointements = () => {
  const dispatch = useDispatch()
  const isLoadingPage = useSelector(state => state.auth.isLoadingPage)
  const [appointementssData, setAppointementssData] = useState(null)
  const [noData, setNoData] = useState(false)

  useEffect(() => {
    const get_appointements = async () => {
      dispatch(set_loading_page(true))
      try {
        const res = await get_all_appointements()
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
  }, [])

  if (appointementssData) {
    return (
      <div>
        <Table
          columns={columns}
          pagination={{ position: 'bottomRight' }}
          dataSource={appointementssData}
          rowKey="id"
        />
      </div>
    )
  }

  if (noData && !isLoadingPage) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  }

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <Spin />
    </div>
  )
}

export default Appointements
