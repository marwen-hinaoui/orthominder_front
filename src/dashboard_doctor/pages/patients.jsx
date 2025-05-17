import { Space, Spin, Table, Tag, Empty, Breadcrumb } from 'antd'
import AddPatientModal from '../components/add_patient_modal'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { get_all_patients } from '../doctor_api/get_all_patients'
import { set_loading_page } from '../../redux-toolkit/slices/user_slice'
import { FaLocationArrow, FaUserEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { Link } from 'react-router'

const columns = [
  {
    title: 'Full name',
    dataIndex: 'full_name',
    key: 'full_name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone_number',
    key: 'phone_number',
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <>
        <Space size="middle">
          <a><FaUserEdit size={16} /></a>
        </Space>
        <Space size="middle">
          <a><MdDeleteForever color='#cf1322' size={16} style={{ margin: '0 0 0 10px' }} /></a>
        </Space>
        <Space size="middle">
          <Link to={`${record.id}/appointement`}>
            <FaLocationArrow size={15} style={{ margin: '0 0 0 10px' }} />
          </Link>
        </Space>
      </>
    ),
  },
]

const Patients = () => {
  const dispatch = useDispatch()
  const isLoadingPage = useSelector(state => state.auth.isLoadingPage)
  const [patientsData, setPatientsData] = useState(null)
  const [noData, setNoData] = useState(false)

  useEffect(() => {
    const getAllPatient = async () => {
      dispatch(set_loading_page(true))
      try {
        const res = await get_all_patients()
        if (res.resData && res.resData.data && res.resData.data.length > 0) {
          setPatientsData(res.resData.data)
        } else {
          setNoData(true)
        }
      } catch (error) {
        setNoData(true)
      } finally {
        dispatch(set_loading_page(false))
      }
    }
    getAllPatient()
  }, [patientsData])

  if (patientsData) {
    return (
      <div>
        <Breadcrumb
          style={{ marginBottom: '18px' }}
          items={[
            {
              title: '',
            },
            {
              title: 'Patients',
            },
          ]}
        />
        <Table
          columns={columns}
          pagination={{ position: 'bottomRight' }}
          dataSource={patientsData}
          rowKey="id"
        />
        <AddPatientModal />
      </div>
    )
  }

  if (noData && !isLoadingPage) {
    return (
      <>
        <AddPatientModal />
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

export default Patients
