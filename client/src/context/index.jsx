import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x1B60c45958674f64783936De0187590c37c56B34');

    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {

        try {

            const data = await createCampaign([
                address,
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image
            ])

            console.log("Contact call success", data)
        } catch (error) {
            console.log("Contract call failure", error)
        }

    }

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                createCampaign: publishCampaign,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);