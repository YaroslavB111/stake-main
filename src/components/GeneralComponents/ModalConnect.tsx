import { HideImage } from '@mui/icons-material';
import { useWeb3React } from '@web3-react/core';
import React, { Component, Fragment, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { injected, walletconnect } from '../../wallet/connectors';



function ModalConnect({ show, setShow }: any, toCheck : any) {
  console.log(toCheck, "-----")

  const { active, account, library, connector, activate, deactivate } = useWeb3React();
  const [checked, setChecked] = useState(false);
  const [isNetwork, SetNetwork] = useState(0);
  const [isWallet, SetWallet] = useState(0);

  // useEffect(() => {
  //   setChecked(toCheck);
  // }, [])

  function handleChange(t: any) {
    let target = t.target;
    setChecked(target.checked);
    console.log(checked, "+++")
  }

  async function connectInjected() {
    try {
      await activate(injected);
      setShow(false);
      SetWallet(1)
    } catch (exc) {
      console.log(exc);
    }
  }

  async function connectWalletConnect() {
    try {
      await activate(walletconnect);
      setShow(false);
      SetWallet(2)
    } catch (exc) {
      console.log(exc);

    }
  }
  const setupNetwork = async (_chainId: any) => {
    const chainId = parseInt(_chainId, 10);
    const { ethereum } = window as any;
    console.log(chainId, "+----");
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
          },
        ],
      });
      SetNetwork(chainId)
      return true;
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error);
      return false;
    }
  };
  const html = (
    <Modal show={show} onHide={setShow}>
      <Modal.Header className="bg-black">
        <h4 className="modal-title" id="exampleModalLabel">
          Select Wallet
        </h4>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" onClick={() => {
            setShow(false)
          }}>×</span>
        </button>
      </Modal.Header>
      <Modal.Body className="bg-black connect-modal">
        <div>
          {
            checked ?
              <Fragment>

                <div className="mb-2"><div className="row mb-3">
                  <div className="col-md-12">
                    <h6>1 Accept <a>Terms of Service</a> and <a>Privacy Policy</a></h6>
                    <div className="pl-3">
                      <input type="checkbox" onChange={handleChange} checked={checked} /> I read and accept
                    </div>
                  </div>
                </div>
                </div>

                <div className="mb-2">
                  <div className="row mb-3">
                    <h6>2. Connect Network</h6>
                    <div className="col"  onClick={() => {
                      setupNetwork(1)
                    }}>
                      <div>
                        <img src="assets/img/ethereum.png"  width="50px" height="50px" style={{marginBottom: "10px"}}/>
                        {
                          isNetwork === 1 &&
                            <img src="assets/img/success.png" width="35px" height="35px" style={{marginLeft: "-20px", marginTop: "20px"}}/>
                        }
                      </div>
                      <p className="mt-1">Ethereum</p>
                    </div>
                    <div className="col" onClick={() => {
                      setupNetwork(137)
                    }}>
                      <div>
                        <img src="assets/img/polygon.png"  width="50px" height="50px" style={{marginBottom: "10px"}}/>
                        {
                          isNetwork === 137 &&
                            <img src="assets/img/success.png" width="35px" height="35px" style={{marginLeft: "-20px", marginTop: "20px"}}/>
                        }
                      </div>
                      <p className="mt-1">Polygon</p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <h6>3. Connect Wallet</h6>
                  <div onClick={connectInjected} className="col">
                      <div>
                        <img src="assets/img/metamask.png"  width="50px" height="50px" style={{marginBottom: "10px"}}/>
                        {
                          isWallet === 1 &&
                            <img src="assets/img/success.png" width="35px" height="35px" style={{marginLeft: "-20px", marginTop: "20px"}}/>
                        }
                      </div>
                    <p className="mt-1">Metamask</p>
                  </div>
                  <div onClick={connectWalletConnect} className="col">
                      <div>
                        <img src="assets/img/walletconnect.png"  width="50px" height="50px" style={{marginBottom: "10px"}}/>
                        {
                          isWallet === 2 &&
                            <img src="assets/img/success.png" width="35px" height="35px" style={{marginLeft: "-20px", marginTop: "20px"}}/>
                        }
                      </div>
                    <p className="mt-1">Walletconnect</p>
                  </div>
                </div>
              </Fragment>


              :
              <div className="mb-2"><div className="row mb-3">
                <div className="col-md-12">
                  <h6>1 Accept <a>Terms of Service</a> and <a>Privacy Policy</a></h6>
                  <div className="pl-3">
                    <input type="checkbox" onChange={handleChange} checked={checked} /> I read and accept
                  </div>
                </div>
              </div>
              </div>
          }
        </div>



        {/* <div>
            <div className="mb-2">
              <div className="row">
                <h6>1. Connect to Network</h6>
                <div className="col-md-6 text-center network">
                  <img src="assets/img/ethereum.svg" />
                  <br />
                  Ethereum
                </div>
                <div className="col-md-6 text-center network disabled">
                  <img src="assets/img/polygone.svg" />
                  <br />
                  Polygon
                </div>
              </div>
            </div>
            <div>
              <div className="row">
                <h6>2. Connect to Wallet</h6>
                <div onClick = {connectInjected}  className="col-md-6 text-center">
                  <img src="assets/img/metamask.png" />
                  <br />
                  Metamask
                </div>
                <div onClick = {connectWalletConnect} className="col-md-6 text-center">
                  <img src="assets/img/walletconnect.svg" />
                  <br />
                  Walletconnect
                </div>
              </div>
            </div>
          </div> */}

        {/* <ul className="list-group connectors-list">
                  <li onClick = {connectInjected} className="
                      list-group-item
                      d-flex
                      justify-content-between
                      align-items-center
                      wallet-list
                    ">
                    Metamask
                    <img className='wallet-logo' src="assets/img/metamask.png" />
                  </li>
                  <li onClick = {connectWalletConnect} className="
                      list-group-item
                      d-flex
                      justify-content-between
                      align-items-center
                      wallet-list
                    ">
                    WalletConnect
                    <img className="wallet-logo" src="assets/img/walletconnect.svg" />
                  </li>
                </ul> */}
      </Modal.Body>
    </Modal>
  );
  return html;


}


export default ModalConnect;


{/* <div class="modal fade" id="connectwallet">
	    	<div class="modal-dialog" role="document">
	    		<div class="modal-content bg-black">
	    			<div class="modal-header">
	    				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
	    					<span aria-hidden="true">&times;</span>
	    				</button>
	    			</div>
	    			<div class="modal-body">
			        	
			        <div class="mb-2">
			        		<div class="row">
			        			<h6>1. Connect to Network</h6>
			        			<div class="col-md-6 text-center">
			        				<img src="assets/img/ethereum.png">
			        				<br>
			        				Ethereum
			        			</div>
			        			<div class="col-md-6 text-center">
			        				<img src="assets/img/polygon.png">
			        				<br>
			        				Polygon
			        			</div>
			        		</div>
			        	</div>
			        	<div class="">
			        		<div class="row">
			        			<h6>2. Connect to Wallet</h6>
			        			<div class="col-md-6 text-center">
			        				<img src="assets/img/metamask.png">
			        				<br>
			        				Metamask
			        			</div>
			        			<div class="col-md-6 text-center">
			        				<img src="assets/img/walletconnect.png">
			        				<br>
			        				Walletconnect
			        			</div>
			        		</div>
			        	</div>
			      	</div>
			    </div>
			</div>
		</div> */}



{/* <div className="modal fade" id="ConnectModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content bg-black">
              <div className="modal-header">
                <h4 className="modal-title" id="exampleModalLabel">Select Wallet</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Connect to the site below with one of our available wallet
                  providers.
                </p>
                <ul className="list-group">
                  <li onClick = {connect} className="
                      list-group-item
                      d-flex
                      justify-content-between
                      align-items-center
                      wallet-list
                    ">
                    Metamask
                    <img src="assets/img/metamask.png" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div> */}