import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Web3 } from 'web3';
import exit from '../assets/cross.png';
import del from '../assets/delete.png';

const Navbar = () => {
    const [message, setMessage] = useState();
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [loggedUser, setLoggedUser] = useState('');
    const [showModel, setShowModel] = useState(false);
    const [file, setFile] = useState(null);


    useEffect(() => {
        window.ethereum.on('accountsChanged', async () => {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3Instance = new Web3(window.ethereum);
            await web3Instance.eth.getAccounts().then((accounts) => {
                setMessage('');
                setIsLoggedin(false);
                setLoggedUser(accounts[0]);
            })
        })
    });

    const handleOpenModel = () => {
        setShowModel(true);
    }

    const handleCloseModel = () => {
        setShowModel(false);
    }

    const handleFileChange = (e) => {
        let file = e.target.files[0];
        console.log(file);
        if (file) setFile(file);
    }

    const clearFile = () => {
        setFile(null);
    }


    const handleConnectWallet = async () => {

        if (window.ethereum !== undefined) {
            let user;
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3Instance = new Web3(window.ethereum);
            await web3Instance.eth.getAccounts().then((accounts) => {
                user = accounts[0];
                setLoggedUser(accounts[0]);
            })

            if (user) {
                let d = new Date();
                let hours = d.getHours();
                const minutes = d.getMinutes();
                const seconds = d.getSeconds();
                const ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12;
                const paddedMinutes = minutes < 10 ? '0' + minutes : minutes;
                const paddedSeconds = seconds < 10 ? '0' + seconds : seconds;
                const currentTime = ' ' + hours + ':' + paddedMinutes + ':' + paddedSeconds + ' ' + ampm;
                const date = `${d.getUTCDate()}/${d.getUTCMonth() + 1}/${d.getUTCFullYear()}`
                const message = `Sign the message:\n\nThis is only for account verification: \n\nDATE:  ${date} \nTIME:  ${currentTime}`;

                try {
                    await web3Instance.eth.personal.sign(message, user, '').then((e) => {
                        if (e) {
                            setMessage(e);
                            setIsLoggedin(true);
                        }
                    });
                }
                catch (err) {
                    window.alert("Sign the Message to Continue.")
                }
            }
            else {
                window.alert("Install Metamask to continue!!!")
            }
        }
    };


    return (
        <>
            {showModel &&
                <div className='bg-[rgba(0,0,0,0.8)] fixed top-0 left-0 h-full w-full z-50 flex justify-center items-center'>
                    <div className='bg-white h-auto w-[450px] rounded-md p-3'>
                        <div className=' h-[400px] w-[425px] rounded relative flex justify-center border border-gray-400'>
                            {file ?
                                <>
                                    <div className='absolute top-0 z-40 right-0'>
                                        <img src={del} height="20px" width="30px" className='cursor-pointer bg-white rounded-xl' onClick={clearFile} />
                                    </div>
                                    <img src={file ? URL.createObjectURL(file) : ''} className='object-cover max-h-[400px]'></img>
                                </>
                                :
                                <input type='file' onChange={(e) => handleFileChange(e)} className='absolute top-48 left-24'></input>
                            }
                        </div>
                        <div className='flex flex-col mt-4 text-[20px] font-roboto'>
                            <label className='text-center'>Price</label>
                            <input type='text' className='border border-gray-400 h-12 rounded focus:outline-none p-2 text-[18px]'>
                            </input>
                        </div>
                        <button className='mt-6 bg-blue-600 font-roboto cursor-pointer text-white text-[16px] h-12 p-2 w-full rounded'>
                            Create
                        </button>
                    </div>
                    <div className='h-[600px] w-16 items-start'>
                        <img src={exit} height="60px" width="45px" className='cursor-pointer hover:bg-[rgba(255,255,255,0.12)] rounded-sm' onClick={handleCloseModel} />
                    </div>
                </div>
            }
            <div className="top-0 sticky flex justify-between items-center p-[20px] 
                        pl-[50px] pr-[50px] shadow shadow-gray-600 h-20 w-full phone:px-[10px]">
                <div className='font-mogra text-blue-600 text-[40px] phone:text-[22px]'>
                    <h1 className='font-mogra'>HAMS PICS</h1>
                </div>
                <div className='flex'>
                    <button className='mr-10 bg-blue-600 font-roboto cursor-pointer text-white text-[16px] h-12 p-2 w-28 rounded'
                        onClick={handleOpenModel}>
                        Create
                    </button>
                    {isLoggedin || message ?
                        <div className='border border-gray-600 rounded h-12 w-40 flex justify-center items-center phone:h-8 w-30'>
                            <p className='text-[18px] font-roboto'>{loggedUser.substring(0, 10) + '....'}</p>
                        </div>
                        :
                        <div>
                            <button className='bg-blue-600 font-roboto cursor-pointer text-white text-[16px] h-12 p-2 rounded' onClick={handleConnectWallet}>Connect Wallet</button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}


export default Navbar;