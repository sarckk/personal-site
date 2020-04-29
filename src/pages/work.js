import React from "react"
import styled from "styled-components"
import Layout from "../components/layouts/layout"
import { Headings } from "../components/page-elements"
import { graphql } from "gatsby"

const WorkGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  gap: 20px;
  padding: 0 18px;
  margin-bottom: ${({ theme }) => theme.spacing["3"]};
`

const Repo = styled.div`
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing["2"]} 0;
  display: flex;
  flex-direction: column;

  &:hover {
    a {
      color: ${({ theme }) => theme.colors.anchorHover};
    }

    div#langs {
      opacity: 1;
    }
  }
`
const RepoName = styled.a`
  font-family: ${({ theme }) => theme.font.sans};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.gray[900]};
  text-decoration: none;
  transition: color 0.2s ease;
`

const RepoDesc = styled.div`
  font-family: ${({ theme }) => theme.font.sans};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing["4"]};
  flex: 1;
`

const RepoLanguages = styled.div`
  opacity: 0;
  display: flex;
  align-items: center;
  transition: all 0.4s ease;
`

const WorkHeader = styled.h2`
  display: grid;
  grid-template-columns: 10px auto minmax(20px, 1fr);
  gap: 8px;
  align-items: center;
  width: 100%;
  font-family: ${({ theme }) => theme.font.sans};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.gray[800]};
  margin-bottom: ${({ theme }) => theme.spacing["3"]};

  :before,
  :after {
    content: "";
    border-top: 1px solid ${({ theme }) => theme.colors.gray[700]};
  }
`

const ComingSoon = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.gray[600]};
  font-family: ${({ theme }) => theme.font.sans};
`

const Lang = styled.span`
  font-family: ${({ theme }) => theme.font.sans};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray[800]};
  margin: 0 5px;

  :before {
    content: "\\A0";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    background-color: ${props => props.color};
    line-height: 9px;
    margin-right: 2px;
  }
`

export default ({ data }) => {
  return (
    <Layout>
      <Headings.SerifH1>Work</Headings.SerifH1>
      <WorkHeader>Personal projects</WorkHeader>
      <WorkGrid>
        {data.github.user.repositories.edges.map(({ node }) => {
          console.log("NODE LANGUAGES", node.languages)
          return (
            <Repo>
              <RepoName
                href={node.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {node.name}
              </RepoName>
              <RepoDesc
                dangerouslySetInnerHTML={{ __html: node.descriptionHTML }}
              ></RepoDesc>
              <RepoLanguages id="langs">
                {node.languages.edges.map(({ node }) => (
                  <Lang color={node.color}>{node.name}</Lang>
                ))}
              </RepoLanguages>
            </Repo>
          )
        })}
      </WorkGrid>
      <WorkHeader>Generative art</WorkHeader>
      <WorkGrid>
        <ComingSoon>Coming soon!</ComingSoon>
      </WorkGrid>
    </Layout>
  )
}

export const query = graphql`
  query GithubQuery {
    github {
      user(login: "sarckk") {
        repositories(
          first: 10
          privacy: PUBLIC
          ownerAffiliations: OWNER
          orderBy: { field: CREATED_AT, direction: DESC }
        ) {
          edges {
            node {
              descriptionHTML
              url
              name
              languages(first: 10) {
                edges {
                  node {
                    name
                    color
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
