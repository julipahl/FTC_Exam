## Question 4

While Proof of Work (PoW) utilizes energy to answer PoW puzzles, Proof of Stake (PoS) seeks to avoid this issue by attributing mining power to the proportion of coins held by a miner. Miners have to stake an amount of their tokens to have a chance at being selected to validate block transactions, with the goal being to achieve distributed consensus. The idea behind this is that miners will act rationally or otherwise would devalue their own stake.

Libra uses a core data structure which does not contain blocks, hence one could argue that it is not essentially a blockchain. However, Libra's core data structure are transactions forming a sequence which are incrementally stored in Merkle trees, where the root of this tree contains an authenticator value. Merkle trees are also used in traditional blockchains. Currently Libra is not really permissionless or centralized, as most other blockchains. Libra intends to use PoS, where the majority of founding members need to confirm new transactions (which means that currently Libra depends on the majority of the founding members being trustworthy), by "staking" some amount of Libra. Eventually this would expand to a permissionless PoS by allowing non-founders to confirm transactions based on their stake, however they are also trying to solve the same research problems as Ethereum at the moment. 

#### Advantages
* The main advantage and reason to Libra for doing this is that PoW has poor performance
* PoW has high energy/environmental costs (i.e PoS is cheaper and greener), if Libra was to become a success, this could become a major issue
* PoW resulted in mining pools to be created (to increase likelihood of success), and so concentrating the mining, resulting in centralization again. 
* PoS may be more secure, as you would have to own 51% of the crypto to make a malicious attack

#### Disadvantages
* some are worried PoS is not as secure as PoW, as hacking with PoW is very expensive
* there are worries that PoS leads to the rich getting richer, as they get rewarded for owning more than others, this is not the case with PoW (although one needs to be pretty rich for all the hardware with PoW)
* PoS is still in testing stage
* it is said that in theory PoS does not achieve consensus and people staking their coins can vote for both forks of the blockchain (i.e. not only the "true" one)
* since holding many coins allows you to mine more, in PoS there may be bigger distribution problems. However this may not be a big issue with Libra, as there will be value in spending it
