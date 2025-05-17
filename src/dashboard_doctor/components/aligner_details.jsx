import { Modal } from "antd"

const AlignerDetails = ({isModalOpen, setModalOpen, selectedAlignerDay}) => {






    const handleCancel = ()=>{
        setModalOpen(false)
    }

  return (
            <Modal
                title="Create Patient"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >


                getting aligner details
                <br /> of day  <br />
                {selectedAlignerDay}
            </Modal>
  )
}

export default AlignerDetails
