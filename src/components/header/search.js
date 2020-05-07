import React, { useRef, useState, useLayoutEffect } from "react"
import algoliasearch from "algoliasearch/lite"
import "instantsearch.css/themes/reset.css"
import {
  InstantSearch,
  connectHits,
  connectSearchBox,
  Highlight,
  Index,
  Configure,
  connectPagination,
} from "react-instantsearch-dom"
import styled, { css } from "styled-components"
import { UnstyledLink, ExtraDetails } from "../page-elements"

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
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
          extra: "rofl",
        })),
      })
    }

    return searchClient.search(requests)
  },
}

const SearchArea = styled.div`
  position: relative;
  width: 80%;
  margin: ${({ theme }) => theme.spacing["12"]} auto;

  ${({ theme }) => theme.tabletPortrait`
    flex-grow: 1;
    margin: 0 0 0 5px;
  `};
`

const SearchInput = styled.input`
  border: 0;
  width: 100%;
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => theme.colors.gray[700]};
  border-radius: 4px;

  font-size: ${({ theme }) => theme.fontSize.base};
  background-color: ${({ theme }) => theme.colors.transparent};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[600]};
    font-size: ${({ theme }) => theme.fontSize.base};
  }

  ${({ theme }) => theme.tabletPortrait`
    padding: 0 5px; 
    border: none;
    border-radius: 0;

    :focus{
      outline: none;
    } 
  `};
`

const HitBox = styled.div`
  display: block;
  width: 100%;

  ${({ theme }) => theme.tabletPortrait`
    position: absolute;
    top: 39px;
    background-color: ${({ theme }) => theme.colors.white};
    border-style: solid;
    border-width: 0 1px 1px 1px;
    box-sizing: border-box;
    border-color: ${({ theme }) => theme.colors.gray[300]};
    box-shadow: 0px 25px 69px -36px rgba(133, 133, 133, 0.66);
    overflow: overlay;
    max-height: 603px;

    ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 4px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.5);
      box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
    }
  `};
`

const Hit = styled.div`
  background-color: transparent;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  ${({ theme }) => theme.tabletPortrait`
    padding: ${({ theme }) => theme.spacing["2"]}
      ${({ theme }) => theme.spacing["4"]};
  `};
`

const BlogHit = styled(Hit)`
  padding: ${({ theme }) => theme.spacing["8"]} 0;

  ${({ theme }) => theme.tabletPortrait`
    height: 120px;
  `};
`

const BookHit = styled(Hit)`
  padding: ${({ theme }) => theme.spacing["4"]} 0;

  ${({ theme }) => theme.tabletPortrait`
    height: 70px;
  `};
`

const HitTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-family: ${({ theme }) => theme.font.sans};
  line-height: ${({ theme }) => theme.lineHeight.tight};
  width: 80%;
  margin-bottom: ${({ theme }) => theme.spacing["2"]};

  ${({ theme }) => theme.tabletPortrait`
    font-size: ${({ theme }) => theme.fontSize.sm};
  `};
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
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray[300]};
  margin: 5px 0;

  ${({ theme }) => theme.tabletPortrait`
    width: 95%;
    margin: 5px auto;
  `};
`

const SearchIndexInfo = styled.div`
  font-family: ${({ theme }) => theme.font.sans};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.lg};
  margin: ${({ theme }) => theme.spacing["6"]} 0
    ${({ theme }) => theme.spacing["1"]} 0;

  ${({ theme }) => theme.tabletPortrait`
    padding: ${({ theme }) => theme.spacing["1"]}
      ${({ theme }) => theme.spacing["4"]};
    background-color: ${({ theme }) => theme.colors.gray[100]};
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.normal};
    color: ${({ theme }) => theme.colors.gray[700]};
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.gray[300]};
    border-width: 1px 0 1px 0;
    margin: 0;
  `};
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
                <UnstyledLink to={`/${hit.path}`}>
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
                <UnstyledLink to={`/${hit.path}`}>
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
      <SearchInput
        ref={forwardRef}
        placeholder="Start searching..."
        value={currentRefinement}
        onChange={e => refine(e.currentTarget.value)}
      />
    )
  }
)

const RefForwardedSearchBox = React.forwardRef((props, ref) => (
  <SearchBox {...props} forwardRef={ref} />
))

const PaginationUL = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const PaginationLI = styled.li`
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  margin: 0 5px;
  border-radius: 2px;
`

const PaginationAnchor = styled.a`
  font-size: ${({ theme }) => theme.fontSize.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  line-height: 20px;
  color: ${props => (props.isSelected ? "white" : "black")};
  background-color: ${props =>
    props.isSelected
      ? css`
          ${({ theme }) => theme.colors.gray[600]}
        `
      : "white"};
  text-decoration: none;
`

const Pagination = connectPagination(
  ({ currentRefinement, nbPages, refine, createURL }) => {
    if (nbPages === 0) {
      return <></>
    }

    return (
      <PaginationUL>
        {new Array(nbPages).fill(null).map((_, index) => {
          const page = index + 1
          const isSelected = currentRefinement === page

          return (
            <PaginationLI key={index}>
              <PaginationAnchor
                isSelected={isSelected}
                href={createURL(page)}
                onClick={event => {
                  event.preventDefault()
                  refine(page)
                }}
              >
                {page}
              </PaginationAnchor>
            </PaginationLI>
          )
        })}
      </PaginationUL>
    )
  }
)

export const Search = React.memo(({ visible, type }) => {
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
      <InstantSearch indexName="blog" searchClient={proxiedSearchClient}>
        <RefForwardedSearchBox ref={searchInputRef} clearText={clearText} />
        <HitBox className="hitbox">
          <Index indexName="blog">
            {type === "mobile" && <Configure hitsPerPage={3} />}
            <BlogHits />
            {type === "mobile" && <Pagination />}
          </Index>
          <Index indexName="books">
            {type === "mobile" && <Configure hitsPerPage={3} />}
            <BookHits />
            {type === "mobile" && <Pagination />}
          </Index>
        </HitBox>
      </InstantSearch>
    </SearchArea>
  )
})
