import React, {useState, useEffect} from 'react';
import './App.css';
import { useWeb3Context } from 'web3-react'

import { Spinner, Alert, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Box, Flex, Card, Heading, Text, Button, OutlineButton, Input, Textarea, Checkbox, Icon } from 'rimble-ui'

import SupplyChainContractAbi from "./contracts/MainChain.json";

let instance = null


function App() {
	
	const context = useWeb3Context();

	const [roles, setRoles] = useState([])
	const [activeTab, setActiveTab] = useState('1')
	const [isLoading, setIsLoading] = useState(true)
	const [logs, setLogs] = useState([])
	const [errMessage, setErrMessage] = useState('')
 

	useEffect(() => {
		if (context.connectorName === undefined) {
			if (window.web3 === undefined) {
				context.setConnector("Infura");
			} else {
				context.setConnector("MetaMask");
			}
		} else {
			if (context != null) {
			const deployedNetwork = SupplyChainContract.networks[context.networkId];
				const supplychainInstance = new context.library.eth.Contract(
					SupplyChainContract.abi,
					deployedNetwork && deployedNetwork.address,
				)
				instance = supplychainInstance
			}
		}
	}, [context])

	useEffect(() => {
    if (instance != null)
      currentAccountRoles()
			setTimeout(() => {
				setIsLoading(false)
			},3000)
			
	}, [context, context.account])

	
	const currentAccountRoles = async () =>{
		let myRoles = await instance.methods.whoAmI().call({from: context.account})
		addToLogs(myRoles)
		const keys = Object.keys(myRoles)
		const values = Object.values(myRoles)
		let updatedRoles = []
		for (var i = 6; i < 12; i++) {
			updatedRoles.push({role: keys[i], isAssgin: values[i]})
		}
		setRoles(updatedRoles)
	}

	const addMeTo = async (roleName) => {
		let tx
		try {
			switch(roleName) {
				case 'designer':
					tx = await instance.methods.assignMeAsDesigner().send({from: context.account})
					break;
				case 'regulator':
					tx = await instance.methods.addRegulator(context.account).send({from: context.account})
					break;
				case 'manufacturer':
					tx = await instance.methods.assignMeAsManufacturer().send({from: context.account})
					break;
				case 'distributor':
					tx = await instance.methods.assignMeAsDistributor().send({from: context.account})
					break;
				case 'retailer':
					tx = await instance.methods.assignMeAsRetailer().send({from: context.account})
					break;
				case 'consumer':
					tx = await instance.methods.assignMeAsConsumer().send({from: context.account})
					break;
			}

			addTxToLogs(tx)
			currentAccountRoles()
		} catch(err) {
			setErrMessage(err.message)
		}
	}

	const removeMeFrom = async (roleName) => {
		let tx
		try {
			switch(roleName) {
				case 'designer':
					tx = await instance.methods.renounceMeFromDesigner().send({from: context.account})
					break
				case 'regulator':
					tx = await instance.methods.renounceMeFromRegulator().send({from: context.account})
					break
				case 'manufacturer':
					tx = await instance.methods.renounceMeFromManufacturer().send({from: context.account})
					break
				case 'distributor':
					tx = await instance.methods.renounceMeFromDistributor().send({from: context.account})
					break
				case 'retailer':
					tx = await instance.methods.renounceMeFromRetailer().send({from: context.account})
					break
				case 'consumer':
					tx = await instance.methods.renounceMeFromConsumer().send({from: context.account})
					break
			}

			addTxToLogs(tx)
			currentAccountRoles()
		} catch(err) {
			setErrMessage(err.message)
		}
	}

	const addRegulator = async() => {
		try {
			let tx = await instance.methods.addRegulator(
				document.getElementsByName("regulatorToBeAdded")[0].value
			).send({from: context.account})

			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}

	const addDrugDesign = async() => {
		try {
			let tx = await instance.methods.designDrug(
				document.getElementsByName("drugDesignerName")[0].value,
				document.getElementsByName("drugDesignName")[0].value,
				document.getElementsByName("drugDesignDesc")[0].value,
				document.getElementsByName("drugDesignNotes")[0].value
			).send({from: context.account})
			addTxToLogs(tx)

		} catch(err) {
			setErrMessage(err.message)
		}
	}

	const addDrugTest = async() => {
		try {
			let tx = await instance.methods.addTestCase(
				document.getElementsByName("drugTestUDPC")[0].value,
				document.getElementsByName("drugTestDesc")[0].value,
				document.getElementsByName("drugTestPass")[0].value,
				document.getElementsByName("drugTestNotes")[0].value
			).send({from: context.account})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
  }
  const addDrugTestByRegulator = async() => {
		try {
			let tx = await instance.methods.addTestCaseByRegulaor(
				document.getElementsByName("drugTestUDPC")[0].value,
				document.getElementsByName("drugTestDesc")[0].value,
				document.getElementsByName("drugTestPass")[0].value,
				document.getElementsByName("drugTestNotes")[0].value
			).send({from: context.account})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}

	const approveDrug = async() => {
		try {
			let tx = await instance.methods.approveDrug(
				document.getElementsByName("drugApproveUDPC")[0].value,
			).send({from: context.account})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}

	const sellDrugDesign = async() => {
		try {
			let priceInWei = context.library.utils.toWei(document.getElementsByName("sellDrugPrice")[0].value)
			let tx = await instance.methods.upForSale(
				document.getElementsByName("sellDrugUDPC")[0].value,
				priceInWei
			).send({from: context.account})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}

	const buyDrugDesign = async() => {
		try {
			let priceInWei = context.library.utils.toWei(document.getElementsByName("buyDrugValue")[0].value)
			let tx = await instance.methods.purchaseDrugDesign(
				document.getElementsByName("buyDrugUDPC")[0].value
			).send({
				from: context.account, 
				value: priceInWei
			})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}

	const UpdatePartnerState = async(_state) => {
		try {
			let tx
			switch(_state) {
				case 'close':
					tx = await instance.methods.closeManufactPartnership(
						document.getElementsByName("partnerStateUDPC")[0].value
					).send({from: context.account})
				break
				case 'open':
					tx = await instance.methods.openManufactPartnership(
						document.getElementsByName("partnerStateUDPC")[0].value,
						document.getElementsByName("partnerStateShare")[0].value
					).send({from: context.account})
				break
				case 'restrict':
					tx = await instance.methods.restrictManufactPartnership(
						document.getElementsByName("partnerStateUDPC")[0].value
					).send({from: context.account})
				break
			}
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}

	const addPartner = async() => {
		try {
			let tx = await instance.methods.buildRestrictPartnerContract(
				document.getElementsByName("addPatnerUDPC")[0].value,
				document.getElementsByName("addPatnerAddress")[0].value,
				document.getElementsByName("addPatnerName")[0].value,
				document.getElementsByName("addPartnerShare")[0].value
			).send({from: context.account})

			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}

	const assignPartner = async() => {
		try {
			let tx = await instance.methods.buildPartnerContract(
				document.getElementsByName("buildPartnerUDPC")[0].value,
				document.getElementsByName("buildPartnerName")[0].value
			).send({from: context.account})

			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}

	const manufactDrugLoad = async() => {
		try {
			let tx = await instance.methods.manufacturDrugsLoud(
				document.getElementsByName("manufacturUDPC")[0].value,
				document.getElementsByName("manufacturQuantity")[0].value.toString()
			).send({from: context.account})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}
	const packDrugLoad = async() => {
		try {
			let tx = await instance.methods.packDrugsLoud(
				document.getElementsByName("packSLU")[0].value,
			).send({from: context.account})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}
	const addDrugLoad = async() => {
		try {
			let priceInWei = context.library.utils.toWei(document.getElementsByName("addPrice")[0].value)
			let tx = await instance.methods.addDrugsLoud(
				document.getElementsByName("addSLU")[0].value,
				priceInWei
			).send({from: context.account})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}
	const buyDrugLoad = async() => {
		try {
      let valueInWei = context.library.utils.toWei(document.getElementsByName("buyValue")[0].value)
      let retaileracount = (document.getElementsByName("buyRetailerAddress")[0].value)
      let retailerAddress = context.library.utils.toChecksumAddress(retaileracount)
			let tx = await instance.methods.buyDrugsLoud(
        document.getElementsByName("buySLU")[0].value,
        retaileracount
				
			).send({
				from: context.account,
				value: valueInWei
			})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}
	const shipDrugLoad = async() => {
		try {
			let tx = await instance.methods.shipDrugsLoud(
				document.getElementsByName("shipSLU")[0].value
			).send({from: context.account})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}
	const receiveDrugLoad = async() => {
		try {
			let tx = await instance.methods.receiveDrugsLoud(
				document.getElementsByName("receiveSLU")[0].value
			).send({from: context.account})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}


	const updateShipEnv = async() => {
		try {
			let tx = await instance.methods.updateDrugsLoudShippmentEnv(
				document.getElementsByName("shipEnvSLU")[0].value,
				document.getElementsByName("shipEnvHumidity")[0].value,
				document.getElementsByName("shipEnvTemprture")[0].value	
			).send({from: context.account})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}
	const updateStockEnv = async() => {
		try {
			let tx = await instance.methods.updateDrugsLoudStockEnv(
				document.getElementsByName("stockEnvSLU")[0].value,
				document.getElementsByName("stockEnvHumidity")[0].value,
				document.getElementsByName("stockEnvTemprture")[0].value	
			).send({from: context.account})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}

	const purchaseDrug = async() => {
		try {
			let valueInWei = context.library.utils.toWei(document.getElementsByName("purchaseValue")[0].value)
			let tx = await instance.methods.purchaseDrug(
				document.getElementsByName("purchasePKU")[0].value,
			).send({
				from: context.account,
				value: valueInWei
			})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}

	const fetchDrugDesignData = async() => {
		try {
			let udpc = document.getElementsByName("fetchDrugUDPC")[0].value
			let DrugDesignData = await instance.methods.fetchDrugDesignData(udpc).call({from: context.account});
			addToLogs(DrugDesignData)
		} catch(err) {
			setErrMessage(err.message)
		}
	}
	const fetchDrugLoadData = async() => {
		try {
			let slu = document.getElementsByName("fetchDrugSLU")[0].value
			let DrugLoadData = await instance.methods.fetchDrugLoaudData(slu).call({from: context.account});
			addToLogs(DrugLoadData)
		} catch(err) {
			setErrMessage(err.message)
		}
	}
	const getDrugLoadPKUs = async() => {
		try {
			let slu = document.getElementsByName("fetchDrugSLU")[0].value
      let DrugLoadPKUs = await instance.methods.fetchLoudPKUs(slu).call({from: context.account});
      let logArry = []
      logArry.push(DrugLoadPKUs.toString(), ...logs)
			setLogs(logArry)
		} catch(err) {
			setErrMessage(err.message)
		}
	}
	const fetchDrugData = async() => {
		try {
			let pku = document.getElementsByName("fetchDrugPKU")[0].value
			let DrugData = await instance.methods.fetchDrugItemData(pku).call({from: context.account});
			addToLogs(DrugData)
		} catch(err) {
			setErrMessage(err.message)
		}
	}
	const fetchEnvHistory = async() => {
		try {
			let pku = document.getElementsByName("fetchDrugPKU")[0].value
			let DrugEnvHistory = await instance.methods.fetchEnvHistory(pku).call({from: context.account});
			addToLogs(DrugEnvHistory)
		} catch(err) {
			setErrMessage(err.message)
		}
	}



	const addTxToLogs =  (tx) => {
		let txHash = tx.transactionHash
		let eventName = Object.keys(tx.events)[0]
		let eventValueName = Object.keys(tx.events[eventName]['returnValues'])[1]
		let eventValue = tx.events[eventName]['returnValues'][eventValueName]

		let updatedLogs = []
		let newLogHash = '$|>>Transaction Hash:' + txHash
		let newLogEvent ='|-----|Event:' + eventName + '(' + eventValueName + ': ' + eventValue + ' )'
		
		updatedLogs.push(newLogHash+newLogEvent, ...logs)
		setLogs(updatedLogs)
	}

	const addToLogs = (_logObject) => {
		let updatedLogs = []
		let dataKeys = Object.keys(_logObject)
		let numberOfData = dataKeys.length
		let logy = ''

		for (var i = (numberOfData/2); i<numberOfData; i++) {
			logy += dataKeys[i] + ': ' + _logObject[dataKeys[i]] +', '
		}

		updatedLogs.push(logy, ...logs)
		setLogs(updatedLogs)
	}
	

	//states
	if (isLoading) {
		return <div className='centered-Loader'><Spinner style={{ width: '10rem', height: '10rem' }} type="grow" color="danger"/></div>
	}
	else {
		return (
			<div>
				{context.networkId === 4 || context.networkId >= 5 ? 
					<Alert style={{textAlign: 'center'}} color="success"> 
					 	Active Connector: {context.connectorName}, --- Account: {context.account},  ---  Network ID: {context.networkId}
					</Alert>
					:<Alert style={{textAlign: 'center'}} color="danger">
						You should use MetaMask and pick Rinkeby Netowrk to be able use contract functionalty.{context.error}
					</Alert>
				}
				<h1 className="display-1" style={{marginLeft: '80px'}}><span role="img" aria-label='stars'> 💊💉 </span>Drug'nDrugz</h1>
				<Nav tabs style={{justifyContent: 'center'}}>
					<NavItem>
						<NavLink 
							active={ activeTab === '1' }
							href='#'
							onClick={() => { setActiveTab('1')}}
						>
							My Roles
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink 
							active={ activeTab === '2' }
							href='#'
							onClick={() => { setActiveTab('2')}}
						>
							Drug Design
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink 
							active={ activeTab === '3' }
							href='#'
							onClick={() => { setActiveTab('3')}}
						>
							Drug Loads
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink 
							active={ activeTab === '4' }
							href='#'
							onClick={() => { setActiveTab('4')}}
						>
							Drug
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink 
							active={ activeTab === '5' }
							href='#'
							onClick={() => { setActiveTab('5')}}
						>
							Fetch Data
						</NavLink>
					</NavItem>
				</Nav>





				<TabContent activeTab={activeTab}>
					<TabPane tabId='1'>
						<Box m={5} p={10}>
							<Flex style={{justifyContent: 'center'}}>
								{roles.map(role => (
									<Box  key={role.id} Flex>
										<Icon key={role.id} size='30' name={role.isAssgin ? 'Beenhere' : 'Cancel'}/>
										<Button key={role.id} p ={3} m={1} onClick={() => addMeTo(role.role)}>Assign {role.role}</Button>
										<Button key={role.id} p ={3} m={1} onClick={() => removeMeFrom(role.role)}>Remove {role.role}</Button>
									</Box>
								))}
							</Flex>
							<Flex style={{justifyContent: 'center'}}  m={10} p={20}>
								<Button p ={3} m={1} Flex  size='large' onClick={() => currentAccountRoles()}>Who Am I ??</Button>
							</Flex>


							<Flex style={{justifyContent: 'center'}}>
								<Card width={[1,1,1/4]} Flex >
									<Heading>Add a new regulator</Heading>
									<Text color='red' px={20}>only regulator</Text>
									<Input type='text' p ={3} m={1} placeholder='new regulator address' name='regulatorToBeAdded'/>
									<OutlineButton pt ={1} mt={1} onClick={() => addRegulator()}>Add</OutlineButton>
								</Card>
							</Flex>
						</Box>
					</TabPane>




					<TabPane tabId='2'>
						<Box m={10} p={20}>
							<Flex>
								<Card width={[1,1,1/3]} mx={'auto'} px={3} pt={20} Flex >
									<Heading>Add New Drug Design</Heading>
									<Text color='red' px={20}>only designer</Text>
									<Input type='text' p ={3} m={1} placeholder='Designer Name' name='drugDesignerName' />
									<Input type='text' p ={3} m={1} placeholder='Drug Name' name='drugDesignName'/>
									<Textarea rows='2' width={[1,1,1]} p={3} m={1} placeholder='Description' name='drugDesignDesc' />
									<Textarea rows='2' width={[1,1,1]} p={3} m={1} placeholder='Add Notes' name='drugDesignNotes'/>
									<OutlineButton p ={3} m={1} onClick={() => addDrugDesign()}>Add Drug Design</OutlineButton>
								</Card>
								<Card width={[1,1,1/3]} mx={'auto'} px={3} pt={20} Flex >
									<Heading>Add Drug Test</Heading>
									<Text color='red' px={20}>only regulator or the owner</Text>
									<Input type='text' p ={3} m={1} placeholder='UDPC' name='drugTestUDPC'/>
									<Textarea rows='2' width={[1,1,1]} p={3} m={1} placeholder='Description' name='drugTestDesc'/>
									<Checkbox label="Passed" name='drugTestPass'/>
									<Textarea rows='2' width={[1,1,1]} p={3} m={1} placeholder='Add Notes' name='drugTestNotes'/>
                  <Flex>
                    <OutlineButton p ={3} m={1} onClick={()=> {addDrugTest()}} >Add Test by owner</OutlineButton>
									  <OutlineButton p ={3} m={1} onClick={()=> {addDrugTestByRegulator()}} >Add Test by Regulator</OutlineButton>
                  </Flex>
                  
								</Card>
							</Flex>

							<Flex>
								<Card width={[1,1,1/4]} mx={'auto'} px={3} pt={20} Flex >
									<Heading>Approve Drug</Heading>
									<Text color='red' px={20}>only regulator</Text>
									<Input type='text' p ={3} m={1} placeholder='UDPC' name='drugApproveUDPC'/>
									<p/>
									<OutlineButton pt ={3} mt={1} onClick={()=> {approveDrug()}}>Approve </OutlineButton>
								</Card>	
								<Card width={[1,1,1/4]} mx={'auto'} px={3} pt={20} Flex >
									<Heading>Sell Drug Design</Heading>
									<Text color='red' px={20}>only owner of drug design</Text>
									<Input type='text' p ={3} m={1} placeholder='UDPC' name='sellDrugUDPC'/>
									<Input type='text' p ={3} m={1} placeholder='Ether Price' name='sellDrugPrice'/>
									<p/>
									<OutlineButton p ={3} m={1} onClick={()=> {sellDrugDesign()}}>Up For Sell</OutlineButton>
								</Card>	
								<Card width={[1,1,1/4]} mx={'auto'} px={3} pt={20} Flex >
									<Heading>Buy Drug Design</Heading>
									<Text color='red' px={20}>only manufacturer or designer</Text>
									<Input type='text' p ={3} m={1} placeholder='UDPC' name='buyDrugUDPC'/>
									<Input type='text' p ={3} m={1} placeholder='Ether Value' name='buyDrugValue'/>
									<p/>
									<OutlineButton p ={3} m={1} onClick={()=> {buyDrugDesign()}}>Buy</OutlineButton>
								</Card>	
							</Flex>


							<Flex>
								<Card width={[1,1,1/4]} mx={'auto'} px={3} pt={20} Flex >
									<Heading>Update Manufacturer Partnership States</Heading>
									<Text color='red' px={20}>only owner of drug design</Text>
									<Input type='text' p ={3} m={1} placeholder='UDPC' name='partnerStateUDPC'/>	
									<Button p ={3} m={1} size="medium" onClick={()=> {UpdatePartnerState('close')}}>Close Partnership</Button>
									<Button p ={3} m={1} size="medium" onClick={()=> {UpdatePartnerState('restrict')}}>Restrict partnership</Button>
									<Input type='text' p ={3} m={1} placeholder='Partner Share 100%' name='partnerStateShare'/>	
									<Button p ={3} m={1} size="medium" onClick={()=> {UpdatePartnerState('open')}}>Open Partnership</Button>
								</Card>	
								<Card width={[1,1,1/4]} mx={'auto'} px={3} pt={20} Flex >
									<Heading>Add Manufacture Partner </Heading>
									<Text color='red' px={20}>only owner of drug design</Text>
									<Text color='red' px={20}>when partnership state is restricted only</Text>
									<Input type='text' p ={3} m={1} placeholder='UDPC' name='addPatnerUDPC'/>
									<Input type='text' p ={3} m={1} placeholder='Partner Address' name='addPatnerAddress'/>
									<Input type='text' p ={3} m={1} placeholder='Mabufacturer Name' name='addPatnerName'/>
									<Input type='text' p ={3} m={1} placeholder='Partner Share 100%' name='addPartnerShare'/>
									<p/>
									<OutlineButton p ={3} m={1} onClick={()=> {addPartner()}}>Add Partner</OutlineButton>
								</Card>	
								<Card width={[1,1,1/4]} mx={'auto'} px={3} pt={20} Flex >
									<Heading>Build Manufactur Partnership </Heading>
									<Text color='red' px={20}>only manufacturer</Text>
									<Text color='red' px={20}>when partnership state is open only</Text>
									<Input type='text' p ={3} m={1} placeholder='UDPC' name='buildPartnerUDPC'/>
									<Input type='text' p ={3} m={1} placeholder='Mabufacturer Name' name='buildPartnerName'/>
									<p/>
									<OutlineButton p ={3} m={1} onClick={()=> {assignPartner()}}>Build Partnership</OutlineButton>
								</Card>	
							</Flex>
						</Box>
					</TabPane>



					<TabPane tabId='3'>
						<Box m={10} p={20}>
							<Flex>
								<Card width={[1,1,1/4]} mx={'auto'} px={3} pt={20} Flex >
									<Heading>Manufactur Drugs Load </Heading>
									<Text color='red' px={20}>only manufacturer</Text>
									<Text color='red' px={20}>only partner or owner of drug design</Text>
									<Input type='number' p ={3} m={1} placeholder='UDPC' name='manufacturUDPC'/>
									<Input type='number' p ={3} m={1} placeholder='Quantity' name='manufacturQuantity'/>
									<p/>
									<OutlineButton p ={3} m={1} onClick={()=> {manufactDrugLoad()}}>Manufactur</OutlineButton>
								</Card>	
								<Card width={[1,1,1/4]} mx={'auto'} px={3} pt={20} Flex >
									<Heading>Pack Drugs Load </Heading>
									<Text color='red' px={20}>only manufacturer of drugs load</Text>
									<Input type='text' p ={3} m={1} placeholder='SLU' name='packSLU'/>
									<p/>
									<OutlineButton p ={3} m={1} onClick={()=> {packDrugLoad()}}>Pack</OutlineButton>
								</Card>
								<Card width={[1,1,1/4]} mx={'auto'} px={3} pt={20} Flex >
									<Heading>Sell Drugs Load </Heading>
									<Text color='red' px={20}>only manufacturer of drugs load</Text>
									<Input type='text' p ={3} m={1} placeholder='SLU' name='addSLU'/>
									<Input type='text' p ={3} m={1} placeholder='Unit Price' name='addPrice'/>
									<p/>
									<OutlineButton p ={3} m={1} onClick={()=> {addDrugLoad()}}>Up For Sale</OutlineButton>
								</Card>		
							</Flex>


							<Flex>
								<Card width={[1,1,1/4]} mx={'auto'} px={3} pt={20} Flex >
									<Heading>Buy Drugs Loud</Heading>
									<Text color='red' px={20}>only distributor</Text>
									<Input type='text' p ={3} m={1} placeholder='SLU' name='buySLU'/>
									<Input type='text' p ={3} m={1} placeholder='Retailer Address' name='buyRetailerAddress'/>
									<Input type='text' p ={3} m={1} placeholder='Ether Value' name='buyValue'/>
									<p/>
									<OutlineButton p ={3} m={1} onClick={()=> {buyDrugLoad()}}>Buy</OutlineButton>
								</Card>	
								<Card width={[1,1,1/4]} mx={'auto'} px={3} pt={20} Flex >
									<Heading>Ship Drugs Load </Heading>
									<Text color='red' px={20}>only manufacturer of drugs load</Text>
									<Input type='text' p ={3} m={1} placeholder='SLU' name='shipSLU'/>
									<p/>
									<OutlineButton p ={3} m={1} onClick={()=> {shipDrugLoad()}}>Ship</OutlineButton>
								</Card>
								<Card width={[1,1,1/4]} mx={'auto'} px={3} pt={20} Flex >
									<Heading>Receive Drugs Load </Heading>
									<Text color='red' px={20}>only retailer of drugs load</Text>
									<Text color='red' px={20}>only drugs load shippment envuirment updated</Text>
									<Input type='text' p ={3} m={1} placeholder='SLU' name='receiveSLU'/>
									<p/>
									<OutlineButton p ={3} m={1} onClick={()=> {receiveDrugLoad()}}>Recieve</OutlineButton>
								</Card>		
							</Flex>


							<Flex>
								<Card width={[1,1,1/4]} mx={'auto'} px={3} pt={20} Flex >
									<Heading>Update Shippment Envuirment</Heading>
									<Text color='red' px={20}>only manufacturer or distributor of drugs load</Text>
									<Input type='text' p ={3} m={1} placeholder='SLU' name='shipEnvSLU'/>
									<Input type='text' p ={3} m={1} placeholder='Humidity' name='shipEnvHumidity'/>
									<Input type='text' p ={3} m={1} placeholder='Temprture' name='shipEnvTemprture'/>
									<p/>
									<OutlineButton p ={3} m={1} onClick={()=> {updateShipEnv()}}>Add</OutlineButton>
								</Card>	
								<Card width={[1,1,1/4]} mx={'auto'} px={3} pt={20} Flex >
									<Heading>Update Stocking Envuirment</Heading>
									<Text color='red' px={20}>only Retailer of drugs load</Text>
									<Input type='text' p ={3} m={1} placeholder='SLU' name='stockEnvSLU'/>
									<Input type='text' p ={3} m={1} placeholder='Humidity' name='stockEnvHumidity'/>
									<Input type='text' p ={3} m={1} placeholder='Temprture' name='stockEnvTemprture'/>
									<p/>
									<OutlineButton p ={3} m={1} onClick={()=> {updateStockEnv()}}>Add</OutlineButton>
								</Card>	
							</Flex>
						</Box>
					</TabPane>





					<TabPane tabId='4'>
					<Box m={10} p={20}>
						<Flex>
							<Card width={[1,1,1/4]} mx={'auto'} px={3} pt={20} Flex >
								<Heading>Purchase Drug</Heading>
								<Text color='red' px={20}>only consumer</Text>
								<Input type='text' p ={3} m={1} placeholder='PKU' name='purchasePKU'/>
								<Input type='text' p ={3} m={1} placeholder='Ether Value' name='purchaseValue'/>
								<p/>
								<OutlineButton p ={3} m={1} onClick={()=> {purchaseDrug()}}>Purchase</OutlineButton>
							</Card>	
						</Flex>
						</Box>
					</TabPane>





					<TabPane tabId='5'>
						<Box m={10} p={20}>
							<Card>
								<Heading>Drug Design</Heading>
								<Input type='text' p ={3} m={1} placeholder='UDPC' name='fetchDrugUDPC'/>
								<Button size='mediam' p ={3} m={1} onClick={()=> {fetchDrugDesignData()}}>Fetch Data</Button>
								<Text color='green' px={20}>see logs </Text>

								<Heading>Drug Load</Heading>
								<Input type='text' p ={3} m={1} placeholder='SLU' name='fetchDrugSLU'/>
								<Button size='mediam' p ={3} m={1} onClick={()=> {fetchDrugLoadData()}}>Fetch Load Data</Button>
								<Button size='mediam' p ={3} m={1} onClick={()=> {getDrugLoadPKUs()}}>Fetch Load PKUs</Button>
								<Text color='green' px={20}>see logs </Text>

								<Heading>Drug Design</Heading>
								<Input type='text' p ={3} m={1} placeholder='PKU' name='fetchDrugPKU'/>
								<Button size='mediam' p ={3} m={1} onClick={()=> {fetchDrugData()}}>Fetch Data</Button>
								<Button size='mediam' p ={3} m={1} onClick={()=> {fetchEnvHistory()}}>Fetch Enviurment History</Button>
								<Text color='green' px={20}>see logs </Text>
							</Card>
						</Box>
					</TabPane>
				</TabContent>

				<Box>
					<Card  color="green" bg="black" height={'auto'}>
						<Heading>LOGS:</Heading>
						{logs.map(logy => (
								<Text.p key ={logy.id} color='green'>{logy}</Text.p>
						))}
						<Heading color="red">ERROR:</Heading>
						<Text color="red">{errMessage}</Text>
					</Card>
				</Box>
			</div>
		)
	}
}

export default App;