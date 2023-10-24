import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useMemo } from 'react'
import { celoClient } from '../../apollo/client'

export const QUERY_OPTIMISIM = gql`
query getSectionGrants {
    grants(orderBy: numberOfApplications, orderDirection: desc) {
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
      applications {
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



export function useCeloQuery(): {
    loading: boolean
    error: boolean,
    records: OptimisimResponse | undefined
} {
    const { loading, error, data } = useQuery<OptimisimResponse>(QUERY_OPTIMISIM, {
        client: celoClient,
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
