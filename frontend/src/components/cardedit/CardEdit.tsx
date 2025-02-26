import './cardedit.css'
import exit_icon from "./images/x-01.png"
import sort_icon from "./images/compare.png"
import delete_icon from "./images/trash-01 (1).png"
import save_icon from "./images/save-01 (1).png"
import add_icon from "./images/file-plus-02.png"
import { Checkbox, Input, message, Table } from 'antd'
import { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { deleteListCard, getListCard, setListCard } from '../../service/cardService'

interface Props{
    flashcard: any
    setIsEditMode: any
}

interface DataType {
    key: string;
    no: number;
    front: string;
    front_note: string;
    back: string;
    back_note: string;
    status: boolean;
    delete:string;
}

interface Card{
    _id: string,
    front: string,
    front_note: string,
    back: string,
    back_note: string,
    status: boolean,
    no:number,
    idFlashcard: string
}
  
export default function CardEdit({flashcard, setIsEditMode}:Props){
    const [data, setData] = useState<DataType[]>([]);

    useEffect(() =>{
        const fetchData = async (id:string) => {
            try {
                const res:Card[] = await getListCard(id);
                const newList:DataType[] = res.map((item) => ({...item, key: item._id, delete:""}));
                setData(newList);
            } catch (error) {
                console.log(error);
            }   
        }

        if(flashcard._id!==""){
            fetchData(flashcard._id);
        }
    },[flashcard])
    
    const handleInputChange = (key: string, field: keyof DataType, value: string) => {
        const newData = data.map((item) =>
            item.key === key ? { ...item, [field]: value } : item
        );
        setData(newData);
    };
    
    const handleCheckboxChange = (key: string, checked: boolean) => {
        const newData = data.map((item) =>
            item.key === key ? { ...item, status: checked } : item
        );
        setData(newData);
    };

    const handleAddRow = () => {
        const maxNo = data.length > 0 ? Math.max(...data.map(item => item.no)) : 0;
        const newRow: DataType = {
            key: (maxNo + 1).toString(),
            no: maxNo + 1,
            front: "",
            front_note: "",
            back: "",
            back_note: "",
            status: false,
            delete: ""
        };
        setData([...data, newRow]);
    };

    const handleDeleteRow = (key: string) => {
        const newData = data.filter(item => item.key !== key).map((item, index) => ({
            ...item,
            no: index + 1
        }));
        setData(newData);
    };

    const handleShuffle = () => {
        const shuffledData = [...data]
            .sort(() => Math.random() - 0.5)
            .map((item, index) => ({ ...item, no: index + 1 }));
        setData(shuffledData);
    };

    const handleSave = ()=>{
        const bug = data.filter(item => item.front===""||item.back==="");
        const updateData = async (list:Card[])=> {
            try {
                if(list.length!==0)await setListCard(list);
                else await deleteListCard(flashcard._id);
                message.success("Lưu thành công!");
                window.location.reload();
            } catch (error) {
                console.log(error)
            }
        }
        if(bug.length>0){
            console.log(bug);
            message.error('Không được bỏ trống các trường "Mặt trước" và "Mặt sau".');
        }
        else{
            const newListCard:Card[] = data.map((item) => ({
                _id: item.key, 
                front: item.front,
                front_note: item.front_note,
                back: item.back,
                back_note: item.back_note,
                status: item.status,
                no: item.no,
                idFlashcard: flashcard._id
            }));
            updateData(newListCard);
        }
    }
    
    const columns: ColumnsType<DataType> = [
        {title: "No.", dataIndex: "no", key: "no",},
        {
            title: "Mặt trước",
            dataIndex: "front",
            key: "front",
            render: (text: string, record: DataType) => (
                <Input value={text} onChange={(e) => handleInputChange(record.key, "front", e.target.value)}/>
            ),
        },
        {
            title: "Ghi chú MT",
            dataIndex: "front_note",
            key: "front_note",
            render: (text: string, record: DataType) => (
                <Input value={text} onChange={(e) => handleInputChange(record.key, "front_note", e.target.value)}/>
            ),
        },
        {
            title: "Mặt sau",
            dataIndex: "back",
            key: "back",
            render: (text: string, record: DataType) => (
                <Input value={text} onChange={(e) => handleInputChange(record.key, "back", e.target.value)}/>
            ),
        },
        {
            title: "Ghi chú MS",
            dataIndex: "back_note",
            key: "back_note",
            render: (text: string, record: DataType) => (
                <Input value={text} onChange={(e) => handleInputChange(record.key, "back_note", e.target.value)}/>
            ),
        },
        {
            title: "Đã thuộc",
            dataIndex: "status",
            key: "status",
            render: (checked: boolean, record: DataType) => (
                <Checkbox checked={checked} onChange={(e) => handleCheckboxChange(record.key, e.target.checked)}/>
            ),
        },
        {
            title: "",
            dataIndex: "delete",
            key: "delete",
            render: (_, record: DataType) => (
                <figure className='delete_icon' onClick={() => handleDeleteRow(record.key)}><img src={delete_icon} alt="" /></figure>
            ),
        },
    ];
    
    return(
        <div className="cardedit-main">
            <div className="title">
                <p>Chỉnh sửa bộ flashcard</p>
                <p className='name'>{flashcard.name}</p> 
                <figure onClick={() => setIsEditMode(false)}><img src={exit_icon} alt="" /></figure>
            </div>
            <div className='main-box'>
                <div className='table'>
                    <Table columns={columns} dataSource={data} pagination={false}/>
                </div>
                <div className='btn'>
                    <div className='top'>
                        <div className='add' onClick={handleAddRow}>
                            <figure><img src={add_icon} alt="" /></figure>
                            <p>Thêm từ</p>
                        </div>
                        <div className='sort' onClick={handleShuffle}>
                            <figure><img src={sort_icon} alt="" /></figure>
                            <p>Đảo thứ tự</p>
                        </div>
                        <div className='delete' onClick={() => setData([])}>
                            <figure><img src={delete_icon} alt="" /></figure>
                            <p>Xóa hết</p>
                        </div>
                    </div>
                    <div className='save' onClick={handleSave}>
                        <figure><img src={save_icon} alt="" /></figure>
                        <p>Lưu</p>
                    </div>
                </div>
            </div>
        </div>
    )
}