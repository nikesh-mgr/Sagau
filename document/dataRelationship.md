8. Data Relationship Model
   USER (MASTER ENTITY)

Handles:

authentication
identity
role capability
CLIENT PROFILE

Connected to:

job creation
hiring history
agreements as client
WORKER PROFILE

Connected to:

job applications
agreements as worker
skill history
JOB

Connected to:

client
applications
selected worker
lifecycle tracking
APPLICATION

Connects:

Worker ↔ Job

Handles:

proposals
duplicate prevention
application history
AGREEMENT (CONTRACT)

Connects:

Client ↔ Worker ↔ Job

Represents:

active work relationship
work lifecycle
completion tracking
REVIEW

Connected to:

completed agreement
reviewer
review target

Purpose:

trust building
ranking system
reputation
