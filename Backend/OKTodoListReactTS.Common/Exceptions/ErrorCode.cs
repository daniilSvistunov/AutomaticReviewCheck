namespace OKTodoListReactTS.Common.Exceptions
{
    public enum ErrorCode
    {
        // Generic
        Unspecified = 0,

        // Missing
        MissingOrWrongRoles = 1,

        // Delete Not Allowed
        DeleteAttachmentNotAllowed = 100,

        // Update Not Allowed
        UpdateBlobStorageFileNameNotAllowed = 205,
        UpdateCommentNotAllowed = 210,
        UpdateFileNameNotAllowed = 215,
        UpdateIdNotAllowed = 220,
        UpdatePropertyNotAllowed = 245,
        UpdateTeamProjectIdNotAllowed = 260,
        UpdateEntityTypeNotAllowed = 270,
        UpdateEntityIdNotAllowed = 271,
        UpdateEventIdNotAllowed = 272,
        UpdateEventTypeIdNotAllowed = 273,
        UpdateSourceAppNotAllowed = 274,
        UpdateSubscriberNotAllowed = 275,
        UpdateEmailAdressNotAllowed = 276,
        UpdateApplicationIdNotAllowed = 277,
        UpdateEventTypeNameNotAllowed = 278,
        UpdateUserIdNotAllowed = 279,
        UpdateEntityNotAllowed = 280,

        // Not Found
        AttachmentNotFound = 300,
        CommentNotFound = 305,
        EntityTypeNotFound = 310,
        ObjectNotFound = 315, //for generic getById
        ParentCommentNotFound = 320,
        TeamProjectNotFound = 345,
        TeamProjectSettingsNotFound = 350,
        ProtocolNotFound = 360,
        ApplicationNotFound = 365,
        AppNameNotFound = 370,
        SubscriptionNotFound = 375,
        NotificationNotFound = 380,

        // Duplicate
        DuplicateTeamProjectSettings = 440,
        DuplicateBlobStorageFileName = 445,
        DuplicateSubscription = 450,

        // Invalid
        EmptyBlobStorageFileName = 500,
        EmptyId = 505,
        IdNotEmpty = 510,
        InvalidGraphCall = 515,
        InvalidOperation = 520,

        // Out of Bounds
        TooLongContent = 600,
        TooLongEntityText = 605,
        TooLongEventTitle = 610,
        TooLongPath = 615,

        // Information

        // Other
        AddCommentNotAllowed = 800,
        CircularReferenceComment = 805,
    }
}