import React, { useRef, useState, useLayoutEffect } from "react"
import algoliasearch from "algoliasearch/lite"
import "instantsearch.css/themes/reset.css"
import {
  InstantSearch,
  connectHits,
  connectSearchBox,
  connectStateResults,
  Highlight,
  Index,
} from "react-instantsearch-dom"
import styled from "styled-components"
import { UnstyledLink, ExtraDetails } from "../page-elements"

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_KEY
)

// proxy for algoliasearch client to prevent sending user input to server
// when query is initially empty
const proxiedSearchClient = {
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          processingTimeMS: 0,
        })),
      })
    }

    return searchClient.search(requests)
  },
}

const SearchArea = styled.div`
  flex-grow: 1;
  margin-left: 5px;
  position: relative;
  height: 25px;
`

const SearchForm = styled.form``

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: 0;
  padding: 0 5px;
  font-size: ${({ theme }) => theme.fontSize.base};
  background-color: ${({ theme }) => theme.colors.transparent};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[600]};
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`

const HitBox = styled.div`
  position: absolute;
  top: 39px;
  background-color: ${({ theme }) => theme.colors.white};
  display: ${props => (props.visible ? "block" : "none")};
  border-color: ${({ theme }) => theme.colors.gray[300]};
  border-style: solid;
  border-width: 0 1px 1px 1px;
  box-shadow: 0px 25px 69px -36px rgba(133, 133, 133, 0.66);
  overflow: overlay;
  max-height: 603px;
  width: 100%;

  // credit: https://stackoverflow.com/questions/7492062/css-overflow-scroll-always-show-vertical-scroll-bar
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
`

const Hit = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const BlogHit = styled(Hit)`
  padding: ${({ theme }) => theme.spacing["2"]}
    ${({ theme }) => theme.spacing["4"]};
  height: 100px;
`

const BookHit = styled(Hit)`
  padding: ${({ theme }) => theme.spacing["2"]}
    ${({ theme }) => theme.spacing["4"]};
  height: 50px;
`

const HitTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-family: ${({ theme }) => theme.font.sans};
  line-height: ${({ theme }) => theme.lineHeight.tight};
  width: 80%;
`

const HitDesc = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray[700]};
  margin-top: ${({ theme }) => theme.spacing["1"]};
  font-family: ${({ theme }) => theme.font.sans};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const BookHitDesc = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-family: ${({ theme }) => theme.font.sans};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const HitDate = styled(ExtraDetails)`
  position: absolute;
  top: 0;
  right: 14px;
`

const HitSeparator = styled.div`
  height: 1px;
  width: 95%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.gray[300]};
`

const SearchIndexInfo = styled.div`
  padding: ${({ theme }) => theme.spacing["1"]}
    ${({ theme }) => theme.spacing["4"]};
  background-color: ${({ theme }) => theme.colors.gray[100]};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-family: ${({ theme }) => theme.font.sans};
  color: ${({ theme }) => theme.colors.gray[700]};
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.gray[300]};
  border-width: 1px 0 1px 0;
`

const BlogHits = connectHits(({ hits }) => (
  <>
    {hits.length ? (
      <>
        <SearchIndexInfo>Blog posts</SearchIndexInfo>
        {hits.map((hit, i, hits) => {
          return (
            <React.Fragment key={i}>
              <BlogHit>
                <UnstyledLink to={hit.path}>
                  <HitTitle>
                    <Highlight attribute="title" hit={hit} tagName="strong" />
                  </HitTitle>
                  <HitDesc>
                    <Highlight
                      attribute="description"
                      hit={hit}
                      tagName="strong"
                    />
                  </HitDesc>
                  <HitDate>{hit.date.toUpperCase()}</HitDate>
                </UnstyledLink>
              </BlogHit>
              {hits.length - 1 !== i && <HitSeparator />}
            </React.Fragment>
          )
        })}
      </>
    ) : null}
  </>
))

const BookHits = connectHits(({ hits }) => (
  <>
    {hits.length ? (
      <>
        <SearchIndexInfo>Book reviews</SearchIndexInfo>
        {hits.map((hit, i, hits) => {
          return (
            <React.Fragment key={i}>
              <BookHit>
                <UnstyledLink to={hit.path}>
                  <BookHitDesc>
                    <Highlight attribute="title" hit={hit} tagName="strong" />
                    {" ("}
                    <Highlight attribute="authors" hit={hit} tagName="strong" />
                    {" )"}
                  </BookHitDesc>
                </UnstyledLink>
              </BookHit>
              {hits.length - 1 !== i && <HitSeparator />}
            </React.Fragment>
          )
        })}
      </>
    ) : null}
  </>
))

const SearchBox = connectSearchBox(
  ({ currentRefinement, refine, forwardRef, clearText }) => {
    useLayoutEffect(() => {
      if (clearText) {
        refine("")
      }
    }, [clearText, refine])

    return (
      <SearchForm>
        <SearchInput
          ref={forwardRef}
          placeholder="Start searching..."
          value={currentRefinement}
          onChange={e => refine(e.currentTarget.value)}
        />
      </SearchForm>
    )
  }
)

const RefForwardedSearchBox = React.forwardRef((props, ref) => (
  <SearchBox {...props} forwardRef={ref} />
))

const StateResults = connectStateResults(({ searchResults, visible }) => {
  const hasResults = searchResults && searchResults.nbHits !== 0

  if (!hasResults || !visible) {
    return <> </>
  }

  return (
    <>
      <HitBox visible={visible}>
        <Index indexName="blog">
          <BlogHits />
        </Index>

        <Index indexName="books">
          <BookHits />
        </Index>
      </HitBox>
    </>
  )
})

export const Search = React.memo(({ visible }) => {
  const searchInputRef = useRef(null)
  const [clearText, setClearText] = useState(true)

  useLayoutEffect(() => {
    if (visible) {
      setClearText(false)
      searchInputRef.current.focus()
    } else {
      setTimeout(() => setClearText(true), 200)
    }
  }, [visible])

  return (
    <SearchArea>
      <InstantSearch indexName={"blog"} searchClient={proxiedSearchClient}>
        <RefForwardedSearchBox ref={searchInputRef} clearText={clearText} />

        <StateResults visible={visible} />
      </InstantSearch>
    </SearchArea>
  )
})
