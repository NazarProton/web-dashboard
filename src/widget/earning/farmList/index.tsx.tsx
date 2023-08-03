import Button from "@/components/button";
import Typography from "@/components/typography";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUp, Curve, Dai, Usdc, Usdt } from "@/components/icons";
import ActivityChart from "./activityChart";
import FarmActionModal from "./actionModal";
import FortunnaPoolABI from "@/assets/FortunnaPool.json";
import FortunnaToken from "@/assets/FortunnaToken.json";
import { Address, useBalance, usePublicClient, useWalletClient } from "wagmi";
import { getTokenInfo } from "@/api";
import { ethers } from "ethers";
import { PoolCollection, TokenInfos } from "@/constants";

export default function FarmList({
  active,
  pool,
  onOpenActionModal,
  onJoinPool, 
  onSetTokenAInfo,
  onSetTokenBInfo
}: {
  active: boolean,
  pool: PoolCollection,
  onOpenActionModal : () => void,
  onJoinPool: () => void
  onSetTokenAInfo: (x?: TokenInfos) => void,
  onSetTokenBInfo: (x?: TokenInfos) => void
}) {

  const {data:walletClient} = useWalletClient();
  const publicClient = usePublicClient();
  const [tokenAAddress, setTokenAAddress] = useState<string>("");
  const [tokenBAddress, setTokenBAddress] = useState<string>("");
  const [tokenAStakeBalance, setTokenAStakeBalance] = useState<string>("0");
  const [tokenBStakeBalance, setTokenBStakeBalance] = useState<string>("0");
  const [tokenARewardBalance, setTokenARewardBalance] = useState<string>("0");
  const [tokenBRewardBalance, setTokenBRewardBalance] = useState<string>("0");
  const [stakingToken, setStakingToken] = useState<string>("");
  const [rewardToken, setRewardToken] = useState<string>("");
  const [rewardBalance, setRewardBalance] = useState<number>(0);
  
  const {data: tokenABalance} = useBalance({
    token: tokenAAddress as Address,
    address:walletClient?.account.address
  });
  
  const {data: tokenBBalance} = useBalance({
    token: tokenBAddress as Address,
    address:walletClient?.account.address
  });

  const {data: stakingBalance} = useBalance({
    token: stakingToken as Address,
    address: walletClient?.account.address
  })

  const readTokensInfo = async () => {
    
    const staking_Token:any = await publicClient.readContract( {
      address: pool.address as Address,
      abi: FortunnaPoolABI,
      functionName: "stakingToken"
    });

    const reward_Token:any = await publicClient.readContract( {
      address: pool.address as Address,
      abi: FortunnaPoolABI,
      functionName: "rewardToken"
    });

    setStakingToken(staking_Token);
    setRewardToken(reward_Token);

    const tokenA_Address:any = await publicClient.readContract( {
      address: staking_Token as Address,
      abi: FortunnaToken,
      functionName: "underlyingTokens",
      args:[
        0
      ]
    });

    const tokenB_Address:any = await publicClient.readContract( {
      address: staking_Token as Address,
      abi: FortunnaToken,
      functionName: "underlyingTokens",
      args:[
        1
      ]
    });

    setTokenAAddress(tokenA_Address);
    setTokenBAddress(tokenB_Address);

  }

  const readStaking_RewardInfo = async (tokenAddress: string, stake_reward: boolean) => {

    console.log('stakebalance', stakingBalance?.value);

    let lpAmount = 0;
    const res:any = await publicClient.readContract( {
      address: pool.address as Address,
      abi: FortunnaPoolABI,
      functionName: "usersInfo",
      args:[
        walletClient?.account.address
      ]
    });
    console.log('res', res);
    if (stake_reward) {
      lpAmount = res[0];
    } else {
      lpAmount = res[1];
    }
    const tokenA_Balance:any = await publicClient.readContract( {
      address: tokenAddress as Address,
      abi: FortunnaToken,
      functionName: "calcUnderlyingTokensInOrOutPerFortunnaToken",
      args:[
        0,
        lpAmount
      ]
    });

    const tokenB_Balance:any = await publicClient.readContract( {
      address: tokenAddress as Address,
      abi: FortunnaToken,
      functionName: "calcUnderlyingTokensInOrOutPerFortunnaToken",
      args:[
        1,
        lpAmount
      ]
    });
    console.log('tokenA_Balance', tokenA_Balance);
    console.log('tokenB_Balance', tokenB_Balance);

    if (stake_reward) {
      console.log('set stake');
      setTokenAStakeBalance(tokenA_Balance);
      setTokenBStakeBalance(tokenB_Balance);
    } else {
      console.log('set reward');
      setTokenARewardBalance(tokenA_Balance);
      setTokenBRewardBalance(tokenB_Balance);
    }

  }

  useEffect(() => {
    if (active) {
      readTokensInfo();
    }
  }, [active]);

  useEffect(() => {
    if (stakingBalance && stakingToken)
      readStaking_RewardInfo(stakingToken, true);
    if (rewardBalance && rewardToken)
      readStaking_RewardInfo(rewardToken, false);
  }, [stakingBalance, rewardBalance])

  const onHandleActionModal = (event:any) => {

    const tokenAInfo = {
      tokenAddress: tokenAAddress,
      tokenBalanceInfo: tokenABalance,
      tokenStakeBalance: tokenAStakeBalance,
      tokenRewardBalance: tokenARewardBalance,
      stakeTokenAddress: stakingToken,
      rewardTokenAddress: rewardToken
    } as TokenInfos;

    const tokenBInfo = {
      tokenAddress: tokenBAddress,
      tokenBalanceInfo: tokenBBalance,
      tokenStakeBalance: tokenBStakeBalance,
      tokenRewardBalance: tokenBRewardBalance,
      stakeTokenAddress: stakingToken,
      rewardTokenAddress: rewardToken
    } as TokenInfos;

    onSetTokenAInfo(tokenAInfo);
    onSetTokenBInfo(tokenBInfo);
    onOpenActionModal();
  }
  const Assets = ({
    tokenA, 
    tokenB
  }: {
    tokenA: string, 
    tokenB: string
  }) => {
    return (
      <div>
        <div
            className="flex items-center mt-2"
          >
              <Usdc />
              <Typography
                label={tokenA}
                className="!font-inter !text-secondary ml-2"
                variant="body3"
              />
        </div>
        <div
            className="flex items-center mt-2"
          >
              <Usdt />
              <Typography
                label={tokenB}
                className="!font-inter !text-secondary ml-2"
                variant="body3"
              />
        </div>
      </div>
    );
  };
  console.log('tokenAStakeBalance', tokenAStakeBalance);
  console.log('tokenABalance', tokenABalance);
  return (
    <div
      style={{ backgroundColor: "rgba(27, 28, 32, 0.6)" }}
      className="lg:p-[32px] p-[20px]"
    >
      <div className="lg:flex lg:flex-row justify-between">
        <div className="lg:w-[70%]">
          <div className="flex flex-row items-center">
            <div className="flex mr-4">
              <div>
                <Dai />
              </div>
              <div className="-ml-3">
                <Usdt />
              </div>
              <div className="-ml-3">
                <Usdc />
              </div>
            </div>
            <Typography variant="subtitle" label={pool.name} />
          </div>

          <div className="grid lg:grid-cols-4  grid-cols-2  gap-10 mt-[32px] ">
            <div className="md:mb-0">
              {" "}
              <Typography
                variant="body3"
                className="!font-poppins-light text-light-2"
                label="Platform"
              />
              <div className="flex items-center mt-2">
                <Curve />
                <Typography
                  variant="heading"
                  className="ml-[8px] !font-poppins-semi-bold"
                  label="Curve"
                />
              </div>
            </div>
            <div className="md:mb-0">
              <Typography
                variant="body3"
                className="!font-poppins-light text-light-2"
                label="Apy"
              />
              <div className="mt-2 flex items-center">
                <div className="bg-success-3  mr-[8px]  items-center inline-block w-[26px] h-[16px] rounded-[5px]">
                  <div className="flex ] items-center justify-center">
                    <ArrowUp />
                  </div>
                </div>

                <Typography
                  variant="heading"
                  className="!font-poppins-semi-bold"
                  label="5%"
                />
              </div>
            </div>
            <div className="md:mb-0">
              <Typography
                variant="body3"
                className="!font-poppins-light text-light-2"
                label="Volume"
              />
              <Typography
                variant="heading"
                className="!font-poppins-semi-bold mt-2"
                label="$15,000,000"
              />
            </div>
            <div>
              <Typography
                variant="body3"
                className="!font-poppins-light text-light-2 whitespace-nowrap"
                label="Total Value Locked"
              />
              <Typography
                variant="heading"
                className="!font-poppins-semi-bold mt-2"
                label="$500,000,000"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center md:mt-0 mt-10">
          <div className="md:block flex ">
            <Button
              theme="secondary"
              onClick={onJoinPool}
              label="Join Pool"
              rightComponent={
                <svg
                  className="ms-1"
                  width="11"
                  height="10"
                  viewBox="0 0 11 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_51_30003)">
                    <path
                      d="M0.705078 5.3125L5.39258 0.625M5.39258 0.625H0.705078M5.39258 0.625V5.3125"
                      stroke="#FCFCFC"
                      stroke-width="0.9375"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_51_30003">
                      <rect
                        width="6.25"
                        height="6.25"
                        fill="white"
                        transform="translate(0.0800781)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              }
              className="!font-poppins-light md:mr-0 mr-3 md:w-[170px]"
            />
          </div>
        </div>
      </div>
      {active ? (
        <>
          <div className="lg:grid lg:grid-cols-[30%_auto] lg:gap-16 md:mt-[60px] mt-[40px]">
            <div className=" md:mb-0 mb-10">
              <ActivityChart />
            </div>
            <div className="grid lg:grid-cols-3 lg:gap-14">
              <div className="md:mb-0 mb-8 relative overflow-hidden">
                <Typography
                  className="!font-inter mb-2"
                  variant="body1"
                  label="Current Balance"
                />
                <Assets 
                  tokenA = {!tokenAAddress || !tokenABalance ? "--" : ethers.formatUnits(tokenABalance!.value, tokenABalance?.decimals) + " " + tokenABalance?.symbol}
                  tokenB = {!tokenBAddress || !tokenBBalance ? "--" : ethers.formatUnits(tokenBBalance!.value, tokenBBalance?.decimals) + " " + tokenBBalance?.symbol}
                />

                <Button
                  className="w-full mt-9"
                  size="small"
                  onClick={onHandleActionModal}
                  rounded
                  theme="secondary-solid"
                  disabled = {tokenAAddress && tokenBAddress && tokenABalance && tokenABalance?.value > 0 ?false:true}
                  label="Deposit"
                />
              </div>
              <div className="relative overflow-hidden">
                <Typography
                  className="!font-inter mb-2"
                  variant="body1"
                  label="Available Balance"
                />
                <Assets 
                  tokenA = {!stakingToken ? "--" : ethers.formatUnits(tokenAStakeBalance, tokenABalance?.decimals)  + " " + tokenABalance?.symbol}
                  tokenB = {!stakingToken ? "--" : ethers.formatUnits(tokenBStakeBalance, tokenBBalance?.decimals) + " " + tokenBBalance?.symbol}
                />
                <Button
                  className="w-full mt-9"
                  size="small"
                  rounded
                  theme="secondary-solid"
                  onClick={onHandleActionModal}
                  disabled = {parseFloat(tokenAStakeBalance) > 0 || parseFloat(tokenBStakeBalance) > 0?false:true}
                  label="Withdraw"
                />
              </div>
              <div className="lg:my-0 my-8">
                <Typography
                  className="!font-inter mb-2"
                  variant="body1"
                  label="Current Rewards"
                />
                <Assets 
                  tokenA = {!rewardToken ? "--" : ethers.formatUnits(tokenARewardBalance, tokenABalance?.decimals) + " " + tokenABalance?.symbol}
                  tokenB = {!rewardToken ? "--" : ethers.formatUnits(tokenBRewardBalance, tokenBBalance?.decimals) + " " + tokenBBalance?.symbol}
                />
                <Button
                  className="w-full mt-9"
                  size="small"
                  onClick={onHandleActionModal}
                  rounded
                  theme="secondary-solid"
                  disabled = {rewardBalance > 0?false:true}
                  label="Claim Rewards"
                />
              </div>
            </div>
          </div>
        </>
      ) : null}

      <FarmActionModal />
    </div>
  );
}
