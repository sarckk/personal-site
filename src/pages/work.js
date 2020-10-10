import React from "react"
import styled from "styled-components"
import Layout from "../components/layouts/layout"
import { Headings, P, StyledAnchor } from "../components/page-elements"
import { graphql } from "gatsby"
import SEO from "../components/seo"

const Repo = styled.a`
  cursor: pointer;
  display: flex;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gray[900]};
  padding: 6px 12px 10px 12px;

  &:hover {
    #repoName {
      color: ${({ theme }) => theme.colors.anchorHover};
    }
  }
  flex-direction: row;
  align-items: center;
  border: 0;
  padding: 0;
  margin-bottom: 5px;
`

const RepoName = styled.div`
  font-family: ${({ theme }) => theme.font.sans};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSize.lg};
  transition: color 0.2s ease;
`

const RepoDesc = styled.div`
  font-family: ${({ theme }) => theme.font.sans};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-bottom: 0;
  margin-left: 20px;
  display: none;

  ${({ theme }) => theme.mobileLandscape`
  display:block;
  `};
`

const ComingSoon = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.gray[600]};
  font-family: ${({ theme }) => theme.font.sans};
`

const Lang = styled.div`
  font-family: ${({ theme }) => theme.font.sans};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: white;
  background-color: ${({ theme }) => theme.colors.gray[600]};
  padding: 2px 4px;
  border-radius: 5px;
  font-weight: 700;
  margin: 0 5px 0 0;
  margin-left: auto;

  ${({ theme }) => theme.tabletPortrait`
    font-size: ${({ theme }) => theme.fontSize.xs};
  `};
`

const WorkTitle = styled(Headings.SerifH1)`
  text-align: left;
  margin-bottom: 3px;
`

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="Work" />
      <WorkTitle>Featured Projects</WorkTitle>
      <P>
        Here are some of the projects I have done. You can see more of my
        projects on my{" "}
        <StyledAnchor
          href={`https://github.com/sarckk`}
          rel="noopener noreferrer"
          target="_blank"
        >
          github page
        </StyledAnchor>
        .
      </P>
      {data.github.user.pinnedItems.edges.map(({ node }, index) => {
        return (
          <Repo
            key={`repo${index}`}
            href={node.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <RepoName id="repoName">{node.name}</RepoName>
            <RepoDesc
              dangerouslySetInnerHTML={{ __html: node.descriptionHTML }}
            ></RepoDesc>
            <Lang>{node.languages.edges[0].node.name}</Lang>
          </Repo>
        )
      })}
    </Layout>
  )
}

export const query = graphql`
  query GithubQuery {
    github {
      user(login: "sarckk") {
        pinnedItems(first: 5, types: [REPOSITORY, GIST]) {
          totalCount
          edges {
            node {
              ... on Github_Repository {
                descriptionHTML
                url
                name
                languages(first: 10) {
                  edges {
                    node {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
