import { Button } from 'antd'


const SharedButton = ({ name, loading, width, padding }) => {
    if (loading) {
        return (
            <Button 
                loading iconPosition="end" style={{ padding: padding, width: width }} color="primary" variant="filled">
                {name}
            </Button>
        )
    }else{
        return (
            <Button htmlType="submit" style={{ padding: padding, width:width }} color="primary" variant="filled">
                {name}
            </Button>
        )
    }
}

export default SharedButton
