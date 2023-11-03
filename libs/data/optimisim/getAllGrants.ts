import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useMemo } from 'react'
import { optimismClient } from '../../apollo/client'

export const QUERY_OPTIMISIM = gql`
query getSectionGrants {
    grants(first:1000, orderBy: numberOfApplications, orderDirection: desc,where: {totalGrantFundingCommittedUSD_lte: "100000000"}) {
      id
      title
      deadlineS
      deadline
      numberOfApplications
      numberOfApplicationsSelected
      numberOfApplicationsPending
      createdAtS
      updatedAtS
      totalGrantFundingDisbursedUSD
      totalGrantFundingCommittedUSD
      
      __typename
      applications(first:1000) {
        applicantPublicKey
        milestones {
          amount
          amountPaid
          state
          application {
            state
            claims {
              id
            }
          }
        }
      }
    }
  }
`

// interface MaticCurrentPriceResponse {
//     records: {
//         price: number
//     }[]
// }

interface OptimisimResponse {
    grants: {
        id: string
        title: string
        deadlineS: string
        deadline: string
        numberOfApplications: number
        numberOfApplicationsSelected: number
        numberOfApplicationsPending: number
        createdAtS: string
        updatedAtS: string
        totalGrantFundingDisbursedUSD: number
        totalGrantFundingCommittedUSD: number
        __typename: string
        applications: {
            applicantPublicKey: string
            milestones: {
                amount: number
                amountPaid: number
                state: string
                application: {
                    state: string
                    claims: {
                        id: string
                    }[]
                }
            }[]
        }[]

    }[]
}


export function useOptimismQuery(): {
    loading: boolean
    error: boolean,
    records: OptimisimResponse | undefined
} {
    const { loading, error, data } = useQuery<OptimisimResponse>(QUERY_OPTIMISIM, {
        client: optimismClient,
        fetchPolicy: 'cache-first',
    })
    console.log('optimism data', data)
    const formattedData = useMemo(() => {
        if (data) {
            return data as OptimisimResponse
        } else {
            return undefined
        }
    }, [data])

    return {
        loading: loading,
        error: Boolean(error),
        records: formattedData,
    }
}
