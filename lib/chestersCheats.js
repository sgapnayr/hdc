import { API } from 'aws-amplify'
import gql from 'graphql-tag'

const getMyProfile = async () => {
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getMyProfile {
          activeBidAmount
          activeBids
          backgroundImageUrl
          balance
          buyAmount
          buyCount
          createdAt
          id
          imageUrl
          name
          postedAuctionsCount
          screenName
          soldAmount
          soldCount
          title
          titles
          role
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  const profile = result.data.getMyProfile

  profile.imageUrl = profile.imageUrl || 'default_profile.png'
  return profile
}

const getMyBalance = async () => {
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getMyProfile {
          balance
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  const balance = result.data.getMyProfile.balance
  return balance
}

const getWalletAddress = async () => {
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getMyProfile {
          UNITSAddress
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  const walletAddress = result.data.getMyProfile.UNITSAddress
  return walletAddress
}

const getMyReferralCode = async () => {
  const result = await API.graphql({
    query: gql`
      query getReferralCode {
        getReferralCode
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  // console.log("result: ", result)
  const referralCode = result.data.getReferralCode
  return referralCode
}

const getUserAuctions = async (userId, limit, nextToken) => {
  const result = await API.graphql({
    query: gql`
      query getUserAuctions($userId: ID!, $limit: Int!, $nextToken: String) {
        getUserAuctions(userId: $userId, limit: $limit, nextToken: $nextToken) {
          nextToken
          auctions {
            bid
            buyout
            createdAt
            expiration
            highBidderProfile {
              backgroundImageUrl
              buyAmount
              buyCount
              createdAt
              id
              imageUrl
              name
              postedAuctionsCount
              screenName
              soldAmount
              soldCount
              title
            }
            sellerProfile {
              buyCount
              createdAt
              postedAuctionsCount
              title
              soldCount
              soldAmount
              screenName
              name
              backgroundImageUrl
              buyAmount
              id
              imageUrl
            }
            gameItem {
              description
              gameName
              imageUrl
              itemId
              itemName
            }
            id
            quantity
          }
        }
      }
    `,
    variables: {
      userId,
      limit,
      nextToken,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  const auctions = result.data.getUserAuctions
  return auctions
}

const getAuctions = async (itemName, limit, nextToken) => {
  const result = await API.graphql({
    query: gql`
      query getAuctions($itemName: String!, $limit: Int!, $nextToken: String) {
        getAuctions(limit: $limit, itemName: $itemName, nextToken: $nextToken) {
          nextToken
          auctions {
            bid
            buyout
            createdAt
            expiration
            id
            quantity
            gameItem {
              description
              gameName
              imageUrl
              itemId
              itemName
            }
            highBidderProfile {
              backgroundImageUrl
              buyAmount
              buyCount
              createdAt
              id
              imageUrl
              name
              postedAuctionsCount
              screenName
              soldAmount
              soldCount
              title
            }
            sellerProfile {
              backgroundImageUrl
              buyAmount
              buyCount
              createdAt
              id
              imageUrl
              name
              postedAuctionsCount
              screenName
              soldAmount
              soldCount
              title
            }
          }
        }
      }
    `,
    variables: {
      itemName,
      limit,
      nextToken,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  const auctions = result.data.getAuctions
  return auctions
}

const getInventory = async (limit, nextToken) => {
  const result = await API.graphql({
    query: gql`
      query getInventory($limit: Int!, $nextToken: String) {
        getInventory(limit: $limit, nextToken: $nextToken) {
          nextToken
          inventory {
            ItemCount
            username
            gameItem {
              description
              imageUrl
              itemName
              itemId
              gameName
            }
          }
        }
      }
    `,
    variables: {
      limit,
      nextToken,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  const inventories = result.data.getInventory
  return inventories
}

const getGameNames = async () => {
  const result = await API.graphql({
    query: gql`
      query getGameNames {
        getGameNames {
          games {
            ItemCount
            gameName
            id
          }
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  const res = result.data.getGameNames
  return res
}

const getMyGames = async () => {
  const result = await API.graphql({
    query: gql`
      query getMyGames {
        getMyGames {
          games {
            ItemCount
            gameName
            id
            earnings
          }
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  const res = result.data.getMyGames
  console.log('getMyGames res: ', res)
  return res
}

const getProfileByScreenName = async (screenName) => {
  const result = await API.graphql({
    query: gql`
      query getProfile($screenName: String!) {
        getProfile(screenName: $screenName) {
          backgroundImageUrl
          buyAmount
          buyCount
          createdAt
          imageUrl
          name
          id
          screenName
          soldAmount
          soldCount
          title
        }
      }
    `,
    variables: {
      screenName,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  const profile = result.data.getProfile

  return profile
}

const getImageUploadUrl = async (extension, contentType) => {
  const result = await API.graphql({
    query: gql`
      query getImageUploadUrl($extension: String, $contentType: String) {
        getImageUploadUrl(extension: $extension, contentType: $contentType)
      }
    `,
    variables: {
      extension,
      contentType,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })

  return result.data.getImageUploadUrl
}

const editMyProfile = async (newProfile) => {
  const result = await API.graphql({
    query: gql`
      mutation editMyProfile($newProfile: ProfileInput!) {
        editMyProfile(newProfile: $newProfile) {
          backgroundImageUrl
          createdAt
          id
          imageUrl
          name
          screenName
          title
        }
      }
    `,
    variables: {
      newProfile,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  return result.data.editMyProfile
}

const createAuction = async (auctionDuration, bid, buyout, gameId, itemId, quantity) => {
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($auctionDuration: Int!, $bid: Float, $buyout: Float!, $gameId: String!, $itemId: String!, $quantity: Int!) {
        createAuction(newAuction: { auctionDuration: $auctionDuration, bid: $bid, buyout: $buyout, gameId: $gameId, itemId: $itemId, quantity: $quantity }) {
          bid
          buyout
          createdAt
          expiration
          quantity
          sellerProfile {
            name
            screenName
            title
            soldCount
            soldAmount
            postedAuctionsCount
            createdAt
            buyCount
            buyAmount
            id
            imageUrl
            backgroundImageUrl
          }
          gameItem {
            description
            gameName
            imageUrl
            itemId
            itemName
          }
          id
        }
      }
    `,
    variables: {
      auctionDuration,
      bid,
      buyout,
      gameId,
      itemId,
      quantity,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  return result.data.createAuction
}

const cancelAuction = async (auctionId) => {
  const result = await API.graphql({
    query: gql`
      mutation cancelAuction($auctionId: ID!) {
        cancelAuction(auctionId: $auctionId)
      }
    `,
    variables: {
      auctionId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  console.log(result)
  return result
}

const bidAuction = async (auctionId, bid) => {
  const result = await API.graphql({
    query: gql`
      mutation bid($auctionId: ID!, $bid: Float!) {
        bid(auctionId: $auctionId, bid: $bid)
      }
    `,
    variables: {
      auctionId,
      bid,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  console.log(result)
  return result
}

const buyoutAuction = async (auctionId) => {
  const result = await API.graphql({
    query: gql`
      mutation buyout($auctionId: ID!) {
        buyout(auctionId: $auctionId)
      }
    `,
    variables: {
      auctionId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  return result
}

const editAdsAccount = async (adsInput) => {
  const result = await API.graphql({
    query: gql`
      mutation editAdsAccount($adsInput: AdsInput!) {
        editAdsAccount(AdsInput: $adsInput)
      }
    `,
    variables: {
      adsInput,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  return result
}

const setupDevAccount = async (activeUsers, gameLink, gameName, name, totalGamesCreated) => {
  const result = await API.graphql({
    query: gql`
      mutation setupDevAccount($activeUsers: Int!, $gameLink: String!, $gameName: String!, $name: String!, $totalGamesCreated: Int!) {
        devEmail(emailInput: { activeUsers: $activeUsers, gameLink: $gameLink, gameName: $gameName, name: $name, totalGamesCreated: $totalGamesCreated })
      }
    `,
    variables: {
      activeUsers,
      gameLink,
      gameName,
      name,
      totalGamesCreated,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  return result
}

const sendBugReport = async (action, bug, profileId) => {
  const result = await API.graphql({
    query: gql`
      mutation sendBugReport($action: String!, $bug: String!, $profileId: ID!) {
        bugEmail(emailInput: { action: $action, bug: $bug, profileId: $profileId })
      }
    `,
    variables: {
      action,
      bug,
      profileId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  return result
}

const getUserAdsInfo = async () => {
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getUserAdsInfo {
          age
          interest
          profession
          zipcode
          earnings
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  return result.data.getUserAdsInfo
}

const getAdvertisersCampaigns = async () => {
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getAdvertisersCampaigns {
          campaigns
          funds
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  return result.data.getAdvertisersCampaigns
}

const createAdCampaign = async (newAdInput) => {
  // console.log("backend",newAdInput);
  const result = await API.graphql({
    query: gql`
      mutation createAdCampaign($newAdInput: newAdInput!) {
        createAdCampaign(newAdInput: $newAdInput) {
          campaigns
          funds
        }
      }
    `,
    variables: {
      newAdInput,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  return result.data.createAdCampaign
}

const setCampaignActivation = async (campaignId, action) => {
  console.log('campaignId', campaignId)
  console.log('action', action)
  //$ backend api issue
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($campaignId: String!, $action: Boolean!) {
        setCampaignActivation(id: $campaignId, active: $action)
      }
    `,
    variables: {
      campaignId,
      action,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  return result
}

const getCampaign = async (campaignId) => {
  // console.log("campaignId",campaignId);
  const result = await API.graphql({
    query: gql`
      query getCampaign($campaignId: String!) {
        getCampaign(id: $campaignId) {
          questions {
            answers
            question
          }
          active
          createdAt
          id
          title
          videoLink
          views
        }
      }
    `,
    variables: {
      campaignId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  // console.log("Get Campaign result", result)
  return result.data.getCampaign
}

const getCampaignResults = async (campaignId) => {
  console.log('campaignId', campaignId)
  const result = await API.graphql({
    query: gql`
      query getCampaignResults($campaignId: String!) {
        getCampaignResults(adId: $campaignId) {
          responses {
            response
            responseTime
          }
          nextToken
        }
      }
    `,
    variables: {
      campaignId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  // console.log("Get Campaign result", result)
  return result
}

const setCampaignResponse = async (campaignId, input) => {
  // console.log("campaignId",campaignId);
  // console.log("input",input);
  const result = await API.graphql({
    query: gql`
      mutation setCampaignResponse($campaignId: String!, $input: [String]) {
        setCampaignResponse(adId: $campaignId, input: $input)
      }
    `,
    variables: {
      campaignId,
      input,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  return result.data.setCampaignResponse
}

const getAdtoView = async () => {
  // console.log("getAdtoView called!")
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getAdtoView {
          questions {
            answers
            question
          }
          title
          videoLink
          id
          createdAt
          active
        }
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  // console.log("Ad for the user to view", result.data.getAdtoView)
  return result.data.getAdtoView
}

const createGameItem = async (gameItem) => {
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($gameItem: GameItemInput!) {
        createGameItem(gameItem: $gameItem) {
          itemName
          imageUrl
          description
        }
      }
    `,
    variables: {
      gameItem,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  console.log('Created game item: ', result.data.createGameItem)
  return result
}

const editGameItem = async (itemId, gameItem) => {
  const result = await API.graphql({
    query: gql`
      mutation editGameItem($itemId: String!, $gameItem: GameItemInput!) {
        editGameItem(itemId: $itemId, gameItem: $gameItem) {
          itemName
          imageUrl
          description
        }
      }
    `,
    variables: {
      itemId,
      gameItem,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  return result
}

const addNewGame = async (gameName) => {
  const result = await API.graphql({
    query: gql`
      mutation MyMutation($gameName: String!) {
        addNewGame(gameName: $gameName)
      }
    `,
    variables: {
      gameName,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  return result
}

const getGameItemsbyGame = async (gameId) => {
  // console.log("gameId",gameId);
  const result = await API.graphql({
    query: gql`
      query getGameItemsbyGame($gameId: String!) {
        getGameItemsbyGame(gameId: $gameId) {
          gameItems {
            description
            gameName
            imageUrl
            itemId
            itemName
          }
          nextToken
        }
      }
    `,
    variables: {
      gameId,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  // console.log("All Items from the game: ", result.data.getGameItemsbyGame)
  return result.data.getGameItemsbyGame
}

const deposit = async (transactionHash) => {
  const result = await API.graphql({
    query: gql`
      mutation deposit($transactionHash: String!) {
        deposit(transactionHash: $transactionHash)
      }
    `,
    variables: {
      transactionHash,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  const balance = result.data.deposit
  return balance
}

const withdraw = async (amount, address) => {
  const result = await API.graphql({
    query: gql`
      mutation withdraw($amount: Float!, $address: String!) {
        withdraw(amount: $amount, address: $address)
      }
    `,
    variables: {
      amount,
      address,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  const balance = result.data.withdraw
  return balance
}

const setWalletAddress = async (address) => {
  const result = await API.graphql({
    query: gql`
      mutation setWalletAddress($address: String!) {
        setWalletAddress(address: $address)
      }
    `,
    variables: {
      address,
    },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  const response = result.data.setWalletAddress
  return response
}

const getTournamentStats = async () => {
  console.log('getTournamentStats called!')
  const result = await API.graphql({
    query: gql`
      query MyQuery {
        getTournamentStats
      }
    `,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })
  // console.log("Ad for the user to view", result.data.getAdtoView)
  return result.data.getTournamentStats
}

export {
  getMyProfile,
  getWalletAddress,
  getMyReferralCode,
  getProfileByScreenName,
  getImageUploadUrl,
  editMyProfile,
  getUserAuctions,
  getAuctions,
  getInventory,
  createAuction,
  getGameNames,
  getMyGames,
  cancelAuction,
  bidAuction,
  buyoutAuction,
  editAdsAccount,
  setupDevAccount,
  sendBugReport,
  getMyBalance,
  getUserAdsInfo,
  getAdvertisersCampaigns,
  createAdCampaign,
  setCampaignActivation,
  getCampaign,
  getCampaignResults,
  setCampaignResponse,
  editGameItem,
  getAdtoView,
  createGameItem,
  addNewGame,
  getGameItemsbyGame,
  deposit,
  withdraw,
  getTournamentStats,
  setWalletAddress,
}
