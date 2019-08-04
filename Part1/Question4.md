## Question 4

Explain how Libra, as an example of a Proof of Stake protocol , works and what it sadvantages and disadvantages over Proof of Work are
While Proof of Work (PoW) utilizes energy to answer PoW puzzles, Proof of Stake (PoS) seeks to avoid this issue by attributing mining power to the proportion of coins held by a miner. Miners have to stake an amount of their tokens to have a chance at being selected to validate block transactions, with the goal being to achieve distributed consensus. The idea behind this is that miners will act rationally or otherwise would devalue their own stake.

Libra uses a core data structure which does not contain blocks, hence one could argue that it is not essentially a blockchain. However, Libra's core data structure are transactions forming a sequence which are incremently stored in Merkle trees, where the root of this tree contains an authenticator value. Merkle trees are also used in traditional blockchains. Currently Libra is not really permissionless or centralized, as most other blockchains. Libra intends to use PoS, where the marjority of founding members need to confirm new transactions (which means that currently Libra depends on the majority of the founding members being trustworthy), by "stakeing" some amount of Libra. Eventually this would expand to a permissionless PoS by allowing non-founders to conform transactions based on their stake, however they are also trying to solve the same research problems as Ethereum at the moment. 

#### Advantages
* The main advantage and reason to Libra for doing this is that PoW has poor performance
* PoW has high energy/environmental costs (i.e PoS is cheaper and greener)
* PoW resulted in mining pools to be created (to increase likelihood of success), and so concentrating the mining, resulting in centralization again. 
* PoS may be more secure, as you would have to own 51% of the crypto to make a malicious attack

#### Disadvantages
* some are worried PoS is not as secure as PoW, as hacking with PoW is very expensive
* there are worries that PoS leads to the rich getting richer, as they get rewarded for owning more than others, this is not the case with PoW (although one needs to be pretty rich for all the hardware with PoW)
